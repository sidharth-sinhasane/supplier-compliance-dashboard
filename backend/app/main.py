from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud
from .database import engine, get_db
from .ai_service import analyze_compliance_data, generate_compliance_suggestions
from typing import Dict

models.Base.metadata.create_all(bind=engine)
from fastapi.encoders import jsonable_encoder
from pydantic import ValidationError



app = FastAPI()

@app.get("/suppliers", response_model=List[schemas.Supplier])
def read_suppliers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    suppliers = crud.get_suppliers(db, skip=skip, limit=limit)
    try:
        return [schemas.Supplier.from_orm(supplier) for supplier in suppliers]
    except ValidationError as e:
        print(f"Validation error: {e}")
        return []

@app.post("/suppliers", response_model=schemas.Supplier)
def create_supplier(supplier: schemas.SupplierCreate, db: Session = Depends(get_db)):
    db_supplier = crud.create_supplier(db, supplier)
    return jsonable_encoder(db_supplier)


@app.get("/suppliers/{supplier_id}", response_model=schemas.Supplier)
def read_supplier(supplier_id: int, db: Session = Depends(get_db)):
    db_supplier = crud.get_supplier(db, supplier_id=supplier_id)
    if db_supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return db_supplier

@app.post("/suppliers/check-compliance", response_model=Dict[str, int])
async def check_compliance(compliance_data: schemas.ComplianceRecordCreate, db: Session = Depends(get_db)):
    # Store the new compliance record
    crud.create_compliance_record(db, compliance_data)
    
    # Retrieve all compliance records for the supplier
    supplier_records = crud.get_compliance_records(db, compliance_data.supplier_id)
    
    # Analyze compliance data using the LLM
    categorized_issues = analyze_compliance_data(supplier_records)
    
    return categorized_issues

@app.get("/suppliers/insights/{supplier_id}", response_model=List[str])
async def get_insights(supplier_id: int, db: Session = Depends(get_db)):
    # Retrieve compliance records for the supplier
    supplier_records = crud.get_compliance_records(db, supplier_id)
    
    # Analyze compliance data to get categorized issues
    categorized_issues = analyze_compliance_data(supplier_records)
    
    # Generate suggestions based on the categorized issues
    suggestions = generate_compliance_suggestions(categorized_issues)
    
    return suggestions