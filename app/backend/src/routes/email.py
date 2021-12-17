
from fastapi import APIRouter

import os
from fastapi import BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv
from pathlib import Path
from pydantic import EmailStr, BaseModel
from typing import Any, List,Dict
from starlette.responses import JSONResponse
from starlette.requests import Request
load_dotenv('src/.env')
class Envs:
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_FROM = os.getenv('MAIL_FROM')
    MAIL_PORT = 587
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_FROM_NAME = os.getenv('MAIN_FROM_NAME')



router = APIRouter(
  tags=['email']
)

class EmailSchema(BaseModel):
    email: str
    verifNum: str


conf = ConnectionConfig(
    MAIL_USERNAME=Envs.MAIL_USERNAME,
    MAIL_PASSWORD=Envs.MAIL_PASSWORD,
    MAIL_FROM=Envs.MAIL_FROM,
    MAIL_PORT=Envs.MAIL_PORT,
    MAIL_SERVER=Envs.MAIL_SERVER,
    MAIL_FROM_NAME=Envs.MAIL_FROM_NAME,
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    TEMPLATE_FOLDER=Path(__file__).parent.parent / 'templates'
)


html = """
<p>Hi this test mail, thanks for using Fastapi-mail</p> 
"""

@router.post('/email')
async def send_email_async(
    # background_tasks: BackgroundTasks,
    request:EmailSchema): 
    message = MessageSchema (
        subject="[SNUBH] 회원가입 인증 메일입니다.",
        recipients=[request.email],
        body=f"인증번호는 {request.verifNum}입니다.",
        # subtype='html'
    )
    
    fm = FastMail(conf)
    # background_tasks.add_task(fm.send_message, message)
    await fm.send_message(message)
    return "Success"