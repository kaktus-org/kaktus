from db.crud.emails import EmailsCRUD
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from api.config import api_config
from db.database import engine
from db.models import emails as emails_model
from db.schemas import email as email_schema
from utils.database_utils import get_db
from utils.logger import logger_config, configure_logger
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


@app.post("/subscribe/", status_code=status.HTTP_201_CREATED)
async def add_email_to_mailing_list(email_schema: email_schema.EmailCreate, db: Session = Depends(get_db)):
    email: str = email_schema.email
    db_email = EmailsCRUD.get_email(db, email)
    if db_email:
        raise HTTPException(status_code=400, detail="Email already subscribed")

    new_email = EmailsCRUD.create_email(db, email)
    return {
        "message": "Email added to mailing list",
        "email": new_email.email,
        "date_signed_up": new_email.date_signed_up
    }


def start():
    uvicorn.run("api.main:app", host=api_config.host,
                port=api_config.port, reload=True)


def start_prod():
    uvicorn.run("api.main:app", host=api_config.host, port=api_config.port)
