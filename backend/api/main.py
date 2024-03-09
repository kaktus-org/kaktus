from db.models import emails as emails_model
from db.database import engine
from .config import api_config
from utils.logger import logger_config, configure_logger
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


logger = configure_logger(__name__, logger_config.logging_level)

emails_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://127.0.0.1:3000",
    "http://127.0.0.1",
    "http://localhost",
    "http://localhost:3000",
    "http://api.kaktus.money",
    "http://kaktus.money",
    "https://kaktus.money",
    "https://localhost",
    "http://portal.kaktus.money",
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
    return {"message": "Mailing service root"}


def start():
    uvicorn.run("api.main:app", host=api_config.host, port=api_config.port, reload=True)


def start_prod():
    uvicorn.run("api.main:app", host=api_config.host, port=api_config.port)
