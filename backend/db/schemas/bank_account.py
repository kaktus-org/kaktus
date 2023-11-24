from pydantic import BaseModel


class BankAccountBase(BaseModel):
    name: str


class BankAccountCreate(BankAccountBase):
    user: int
    access_token: str
    item_id: str


class BankAccount(BankAccountCreate):
    id: int

    class Config:
        from_attributes = True
