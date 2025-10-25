from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AccessibilityPointBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    type: str
    description: Optional[str] = None
    building_name: Optional[str] = None

class AccessibilityPointCreate(AccessibilityPointBase):
    pass

class AccessibilityPoint(AccessibilityPointBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class BusStopBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    stop_code: str
    accessible: bool = True

class BusStopCreate(BusStopBase):
    pass

class BusStop(BusStopBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
