from sqlalchemy.orm import Session, relation, relationship
from sqlalchemy import Column, Integer, String, ForeignKey, Float, Date
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.sqltypes import Boolean, Date, Numeric
from sqlalchemy.sql.visitors import VisitableType

DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/vacations'
engine = create_engine(DATABASE_URL)
db_session = scoped_session(sessionmaker(bind=engine, autocommit=False, autoflush=False))
Base = declarative_base()

def get_db():
  db = db_session()
  try:
    yield db
  finally:
    db.close()


class Users(Base):
    __tablename__ = 'users'
    rid = Column(String(length=20), primary_key = True, index =True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    pw = Column(String, nullable=False)
    nov = Column(Integer, default=15)

    vacations = relationship('Vacations', back_populates='users')

class Vacations(Base):
    __tablename__ = 'vacations'
    vid = Column(Integer, autoincrement=True, primary_key=True)
    userid = Column(String, ForeignKey('users.rid'))
    vdate = Column(String, nullable=False)
    vtype = Column(String, nullable=False)
    vcheck = Column(Boolean, default=False)
    vhour = Column(String, nullable=True)
    boss = Column(String, nullable=False)

    users = relationship('Users', back_populates='vacations')