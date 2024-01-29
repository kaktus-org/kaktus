from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from db.database import Base
from db.models.roles import user_roles  # noqa: F401. Used for SQLAlchemy relationship registration.


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    income_token = Column(String, unique=True, index=True)
    roles = relationship("Roles", secondary=user_roles, back_populates="users")
