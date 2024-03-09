from pydantic import BaseModel
from sqlalchemy import Date


class Email(BaseModel):
    id: int
    email: str
    date_signed_up: Date

    class Config:
        from_attributes = True
