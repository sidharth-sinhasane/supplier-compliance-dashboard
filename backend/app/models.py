from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB

Base = declarative_base()

class Supplier(Base):
    __tablename__ = "suppliers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    country = Column(String)
    contract_terms = Column(JSONB)  # Store as JSON
    compliance_score = Column(Integer)
    last_audit = Column(Date)
    compliance_records = relationship("ComplianceRecord", back_populates="supplier")

class ComplianceRecord(Base):
    __tablename__ = "compliance_records"
    id = Column(Integer, primary_key=True, index=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    metric = Column(String)
    date_recorded = Column(Date)
    result = Column(String)
    status = Column(String)
    supplier = relationship("Supplier", back_populates="compliance_records")
