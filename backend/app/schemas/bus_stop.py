from pydantic import BaseModel
from typing import Dict, List, Optional

class BusStopBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    accessible: bool = True
    schedule: Dict[str, List[str]]  # Dictionary of times for each stop

class BusStopCreate(BusStopBase):
    pass

class BusStop(BusStopBase):
    id: int

    class Config:
        orm_mode = True