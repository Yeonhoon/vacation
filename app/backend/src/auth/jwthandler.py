# from passlib.context import 
from typing import Optional
from jose import JWTError, jwt
from datetime import datetime, timedelta
from src.database.models import Users, get_db
from src.schemas.token import TokenData
from sqlalchemy.orm import Session
from fastapi import status, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security.utils import get_authorization_scheme_param

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
connect_db = get_db
# security = OAuth2PasswordBearer(tokenUrl='/login')

def create_access_token(data: dict, expire_delta: Optional[timedelta]=None): 
  # data를 암호화함(encode)
    to_encode = data.copy()
    if expire_delta:
        expire = datetime.utcnow() + expire_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

class OAuth2PasswordBearerCookie(OAuth2):
    def __init__(
        self,
        token_url: str,
        scheme_name: str = None,
        scopes: dict = None,
        auto_error: bool = True,
    ):
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password={"tokenUrl": token_url, "scopes": scopes})
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[str]:
        authorization: str = request.cookies.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=401,
                    detail="Not authenticateddddd!",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            else:
                return None

        return param

security = OAuth2PasswordBearerCookie(token_url="/login")

async def get_current_user(token: str= Depends(security), db: Session=Depends(connect_db)):
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="증명되지 않은 사용자입니다.",
    headers={'WWW-Authenticate':'Bearer'}
  )
  
  try: 
      # 사용자를 증명하기 위해 jwt를 해독함(decode)
      payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
      rid : str = payload.get('sub')
      if rid is None:
        raise credentials_exception
      token_data = TokenData(rid = rid)
  except JWTError:
      raise credentials_exception
    
  try:
    user = db.query(Users).filter(Users.rid == token_data.rid).first()
  except:
    raise credentials_exception
  
  return user



