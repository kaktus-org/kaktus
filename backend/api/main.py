from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from .routers import users
from .routers import banking

from db.models import users as users_model
from db.database import SessionLocal, engine
from .config import api_config
from utils.logger import logger_config, configure_logger


logger = configure_logger(__name__, logger_config.logging_level)

users_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(banking.router)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "yurr"}

def start():
    uvicorn.run("api.main:app", host=api_config.host, port=api_config.port, reload=True)

