import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from .routers import users

from db.models import users as users_model

from db.database import SessionLocal, engine

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
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)

