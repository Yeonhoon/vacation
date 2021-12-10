from array import array
from pydantic import BaseModel
from typing import List, Optional

class VacationBase(BaseModel):
    # vid: int
    # userid: str
    vdate: str
    vtype: str
    vhour: str
    # vcheck: bool
    # vboss: str

class VacationList(BaseModel):
    items: List[VacationBase]

class Vacation(VacationBase):
  class Config():
    orm_mode = True


class ShowVacation(BaseModel):
  vid: int
  userid: str
  vdate: str
  vtype: str
  vcheck: bool

  
  class Config():
    orm_mode = True
