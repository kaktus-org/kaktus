from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
from sqlalchemy.orm import Session
import uvicorn

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from .routers import users
from db.models import users as users_model
from db.database import SessionLocal, engine

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    filename="api.log"
)

logger = logging.getLogger(__name__)

users_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)

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
    logger.info("Starting application on 0.0.0.0:8000")
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)
