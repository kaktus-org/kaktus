from pydantic import BaseModel, EmailStr
from datetime import date


class EmailCreate(BaseModel):
    email: EmailStr


class EmailSchema(EmailCreate):
    date_signed_up: date

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
