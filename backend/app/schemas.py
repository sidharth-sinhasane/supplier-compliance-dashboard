from pydantic import BaseModel, Field, Json
from datetime import date
from typing import List, Optional
from pydantic import BaseModel, ConfigDict

class ComplianceRecordBase(BaseModel):
    metric: str
    date_recorded: date
    result: str
    status: str

class ComplianceRecordCreate(ComplianceRecordBase):
    supplier_id: int

class ComplianceRecord(ComplianceRecordBase):
    id: int
    supplier_id: int

    class Config:
        from_attributes = True  # Use this instead of orm_mode in Pydantic v2

class SupplierBase(BaseModel):
    name: str
    country: str
    contract_terms: Json
    compliance_score: int = Field(..., ge=0, le=100)
    last_audit: date
    model_config = ConfigDict(from_attributes=True)

class SupplierCreate(SupplierBase):
    pass

class Supplier(SupplierBase):
    id: int
    name: Optional[str] = None
    country: Optional[str] = None
    contract_terms: Optional[Json] = None
    compliance_score: Optional[int] = None
    last_audit: Optional[date] = None
    class Config:
        #from_attributes = True  # Use this instead of orm_mode in Pydantic v2
        from_attributes = True
class Insight(BaseModel):
    supplier_id: int
    suggestion: str

Supplier.update_forward_refs()
