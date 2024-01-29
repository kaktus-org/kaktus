from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound

from db.models.users import User
from db.models.roles import Roles
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

    @staticmethod
    def add_income_token(db: Session, user: User, income_token: str) -> User:
        user.income_token = income_token
        db.commit()
        db.refresh(user)
        return user

    def assign_role_to_user(db: Session, user_id: int, role_name: str):
        try:
            user = UserCRUD.get_user(db, user_id)
            role = db.query(Roles).filter(Roles.name == role_name).first()
        except NoResultFound:
            return None

        if user and role:
            if role not in user.roles:
                user.roles.append(role)
                db.commit()
        return user

    @staticmethod
    def remove_role_from_user(db: Session, user_id: int, role_name: str):
        try:
            user = UserCRUD.get_user(db, user_id)
            role = db.query(Roles).filter(Roles.name == role_name).first()
        except NoResultFound:
            return None

        if user and role:
            if role in user.roles:
                user.roles.remove(role)
                db.commit()
        return user

    @staticmethod
    def get_user_roles(db: Session, user_id: int):
        try:
            user = UserCRUD.get_user(db, user_id)
            return [role.name for role in user.roles] if user else []
        except NoResultFound:
            return None
