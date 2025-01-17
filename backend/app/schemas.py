from pydantic import BaseModel, Field
from datetime import date
from typing import List, Optional

class SupplierBase(BaseModel):
    name: str
    country: str
    contract_terms: dict
    compliance_score: int = Field(..., ge=0, le=100)
    last_audit: date

class SupplierCreate(SupplierBase):
    pass

class Supplier(SupplierBase):
    id: int
    compliance_records: List["ComplianceRecord"] = []

    class Config:
        orm_mode = True

class ComplianceRecordBase(BaseModel):
    metric: str
    date_recorded: date
    result: float
    status: str

class ComplianceRecordCreate(ComplianceRecordBase):
    supplier_id: int

class ComplianceRecord(ComplianceRecordBase):
    id: int
    supplier_id: int

    class Config:
        orm_mode = True

class Insight(BaseModel):
    supplier_id: int
    suggestion: str
