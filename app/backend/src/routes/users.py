from datetime import timedelta
from os import name
from fastapi import APIRouter, Depends, HTTPException, status, Response, BackgroundTasks
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette.routing import Router
from src.auth.users import validate_user
from src.auth.jwthandler import create_access_token
from src.schemas.token import Status
from src.schemas.users import ShowUser, User
from src.database.models import get_db
from passlib.context import CryptContext
from src.database.models import Users, get_db
from src.auth.jwthandler import (
    create_access_token,
    get_current_user
)
import random
connect_db = get_db

router = APIRouter(
  tags=['users']
)

pwd_cxt = CryptContext(schemes=['bcrypt'], deprecated='auto')
connect_db = get_db
def produce_hash_password(password: str):
    return pwd_cxt.hash(password)


@router.get('/user/{rid}')
async def get_user(rid:str, db:Session=Depends(connect_db)):
    userid = db.query(Users).filter(Users.rid == rid).first()
    if userid:
        res = '아이디 존재함'
    else:
        res = '가입 가능한 아이디'

    return res

@router.post('/register', 
    status_code=status.HTTP_201_CREATED,
    response_model_exclude=['pw'])
async def create_user(request:User, db:Session=Depends(connect_db)) -> ShowUser:
    try:
        new_user = Users(
                rid=request.rid,
                name= request.name, 
                email = request.email,
                pw= produce_hash_password(request.pw),
                nov=request.nov)
    except:
        raise HTTPException(
            status_code=status.HTTP_302_FOUND,
            detail="이미 가입되어있는 아이디입니다."
        )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return "sign up success"


@router.post("/login")
async def login(request: OAuth2PasswordRequestForm = Depends(),
                db: Session=Depends(connect_db)):
    user = await validate_user(request,db)
    
    if not user:
      raise HTTPException(
        status_code= status.HTTP_404_NOT_FOUND,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
      )
    
    access_token = create_access_token(data={"sub":user.rid}, expire_delta=timedelta(minutes=60))
    token = jsonable_encoder(access_token)
    content = {"message": f"You've successfully logged in. Welcome back, {user.rid}!"}
    response = JSONResponse(content=content)
    response.set_cookie(
        "Authorization",
        value=f"Bearer {token}",
        httponly=True,
        max_age=12000,
        expires=12000,
        samesite='Lax',
        secure=False,
    )
    return response

@router.get("/users/whoami", dependencies=[Depends(get_current_user)],
            response_model=User,
            response_model_include=['rid'])
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user




# @router.get('/send-email/backgroundtasks')
# def send_email_backgroundtasks(background_tasks: BackgroundTasks):
#     send_email_background(background_tasks, 'Hello World',   
#     'someemail@gmail.com', {'title': 'Hello World', 'name':'John Doe'})
#     return 'Success'