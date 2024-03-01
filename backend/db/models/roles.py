from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship

from db.database import Base

user_roles = Table(
    "user_roles", Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("role_id", Integer, ForeignKey("roles.id"), primary_key=True)
)


class Roles(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    name = Column(String, unique=True, index=True)

    users = relationship("User", secondary=user_roles, back_populates="roles")
