from sqlalchemy import Column, Integer, String, Date
from db.database import Base


class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    date_signed_up = Column(Date, unique=False, index=True, nullable=False)
