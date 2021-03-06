from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import users
from src.routes import vacations
from src.routes import email
app = FastAPI(title="Vacation Manager")

origins = [
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(vacations.router)
app.include_router(email.router)