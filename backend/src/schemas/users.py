from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
  rid: str
  name: str
  email: str
  pw: str
  nov: float

class User(UserBase):
  class Config():
    orm_mode = True


class ShowUser(BaseModel):
  rid: str
  name: str
  email: str
  nov:float
  
  class Config():
    orm_mode = True
