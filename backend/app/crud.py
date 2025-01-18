from sqlalchemy.orm import Session
from .models import Supplier, ComplianceRecord
from .schemas import SupplierCreate, ComplianceRecordCreate
from typing import List
from datetime import date
from .ai_service import analyze_compliance_data, generate_compliance_suggestions

def get_suppliers(db: Session, skip: int = 0, limit: int = 100) -> List[Supplier]:
      return db.query(Supplier).filter(
        Supplier.name.isnot(None),
        Supplier.country.isnot(None),
        Supplier.compliance_score.isnot(None),
        Supplier.last_audit.isnot(None)
    ).offset(skip).limit(limit).all()

def create_supplier(db: Session, supplier: SupplierCreate) -> Supplier:
    db_supplier = Supplier(**supplier.dict())
    db.add(db_supplier)
    db.commit()
    db.refresh(db_supplier)
    return db_supplier

def get_supplier(db: Session, supplier_id: int) -> Supplier:
    return db.query(Supplier).filter(Supplier.id == supplier_id).first()

def create_compliance_record(db: Session, compliance_data: ComplianceRecordCreate):
    db_record = ComplianceRecord(**compliance_data.dict())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def get_compliance_records(db: Session, supplier_id: int):
    return db.query(ComplianceRecord).filter(ComplianceRecord.supplier_id == supplier_id).all()

def calculate_compliance_score(db: Session, supplier_id: int) -> int:
    records = db.query(ComplianceRecord).filter(ComplianceRecord.supplier_id == supplier_id).all()
    if not records:
        return 100  # Default score for new suppliers
    
    compliant_records = sum(1 for record in records if record.status == "compliant")
    return int((compliant_records / len(records)) * 100)

def generate_insights(db: Session) -> List[dict]:
    suppliers = get_suppliers(db)
    insights = []
    for supplier in suppliers:
        compliance_history = db.query(ComplianceRecord).filter(ComplianceRecord.supplier_id == supplier.id).all()
        suggestion = generate_compliance_suggestions(compliance_history)
        insights.append({
            "supplier_id": supplier.id,
            "suggestion": suggestion
        })
    return insights

def update_compliance_record(db: Session, supplier_id: int, delivery_date: date, status: str) -> ComplianceRecord:
    record = db.query(ComplianceRecord).filter(
        ComplianceRecord.supplier_id == supplier_id,
        ComplianceRecord.date_recorded == delivery_date
    ).first()
    
    if record:
        record.status = status
        db.commit()
        db.refresh(record)
    
    return record
