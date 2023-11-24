from sqlalchemy import Column, Integer, String, ForeignKey

from db.database import Base


class BankAccount(Base):
    __tablename__ = "bank_accounts"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    item_id = Column(String, nullable=False)
    user = Column(Integer, ForeignKey("users.id"), nullable=False)
    access_token = Column(String(150), nullable=False)
