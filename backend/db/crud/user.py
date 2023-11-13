from sqlalchemy.orm import Session

from db.models.users import User
from db.schemas.user import UserCreate


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    not_a_real_password = user.password + "nothashed"  # TODO: obviously insecure, make this secure.
    db_user = User(email=user.email, hashed_password=not_a_real_password, is_active=True)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
