from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.sql import func
from .database import Base

class AccessibilityPoint(Base):
    __tablename__ = "accessibility_points"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    type = Column(String)  # ramp, elevator, accessible_entrance, etc.
    description = Column(String)
    building_name = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class BusStop(Base):
    __tablename__ = "bus_stops"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    stop_code = Column(String, unique=True)
    accessible = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class BusRoute(Base):
    __tablename__ = "bus_routes"
    
    id = Column(Integer, primary_key=True, index=True)
    route_number = Column(String, index=True)
    route_name = Column(String)
    color = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
