from datetime import datetime
from sqlalchemy.orm import Session

from db.models.emails import Email
from utils.statics import StaticClass


class EmailsCRUD(metaclass=StaticClass):

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(Email).filter(Email.email == email).first()

    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Email).offset(skip).limit(limit).all()

    @staticmethod
    def create_email(db: Session, email: Email):
        db_email = Email(email=email.email, date_signed_up=datetime.now(), is_active=True)
        db.add(db_email)
        db.flush()
        db.commit()
        db.refresh(db_email)
        return db_email

    @staticmethod
    def delete_email(db: Session, email: str):
        db.query(Email).filter(Email.email == email).delete()
