from sqlalchemy.orm import Session

from db.models.bank_accounts import BankAccount
from db.schemas.bank_account import BankAccountCreate, BankAccount as BankAccountSchema
from utils.statics import StaticClass


class BankAccountCRUD(metaclass=StaticClass):
    @staticmethod
    def get_bank_account(db: Session, account_id: int) -> BankAccountSchema:
        return db.query(BankAccount).filter(BankAccount.id == account_id).first()

    @staticmethod
    def create_bank_account(db: Session, bank_account: BankAccountCreate) -> BankAccountSchema:
        db_account = BankAccount(name=bank_account.name, user=bank_account.user, access_token=bank_account.access_token, item_id=bank_account.item_id)
        db.add(db_account)
        db.commit()
        db.refresh(db_account)
        return db_account

    @staticmethod
    def get_accounts_for_user(db: Session, user_id: int) -> list[BankAccountSchema]:
        return db.query(BankAccount).filter(BankAccount.user == user_id)
