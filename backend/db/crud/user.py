from sqlalchemy.orm import Session

from db.models import users as user_model
from db.schemas import user as user_schema


def get_user(db: Session, user_id: int):
    return db.query(user_model.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(user_model.User).filter(user_model.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(user_model.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: user_schema.UserCreate):
    not_a_real_password = user.password + "nothashed" # TODO: obviously insecure, make this secure.
    db_user  = user_model.User(email=user_model.User.email, hashed_password=not_a_real_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
