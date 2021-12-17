from fastapi import HTTPException, status, Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from src.database.models import Users, get_db
from passlib.context import CryptContext

connect_db= get_db
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 입력된 패스워드와 hash처리된 패스워드 검증
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def get_user(uid, db):
    # sql = "select * from users"
    # data= db.execute(sql).fetchall()
    data = db.query(Users).filter(Users.rid == uid).first()
    if not data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="사용자가 없습니다."
        )
    return data

async def validate_user(request, db):
    try:
        db_user = await get_user(request.username, db)
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail = " Incorrect username"
        )
    if not verify_password(request.password, db_user.pw):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail = " Incorrect password"
        )
    return db_user
    