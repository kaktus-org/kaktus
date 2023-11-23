from sqlalchemy.orm import Session

from db.models.users import User
from db.schemas.user import UserCreate
from utils.statics import StaticClass
from utils.security import cryptography


class UserCRUD(metaclass=StaticClass):
    @staticmethod
    def get_user(db: Session, user_id: int):
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100):
        return db.query(User).offset(skip).limit(limit).all()

    @staticmethod
    def create_user(db: Session, user: UserCreate):
        hashed_password = cryptography.hash_password(user.password)
        db_user = User(email=user.email, hashed_password=hashed_password, is_active=True)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
