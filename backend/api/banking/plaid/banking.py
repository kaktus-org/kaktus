from sqlalchemy.orm.session import Session

from api.banking.interface import Banking
from api.banking.plaid.services import PlaidLink, PlaidTransactions, PlaidAuth
from db.crud.bank_account import BankAccountCRUD
from db.schemas.bank_account import BankAccountCreate
from db.schemas.user import User


class PlaidBanking(Banking):

    @staticmethod
    def get_link_token() -> dict:
        return PlaidLink.get_link_token()

    @staticmethod
    def get_update_link_token(db: Session, user: User, account_name: str) -> dict:
        accounts = [account for account in BankAccountCRUD.get_accounts_for_user(db, user.id) if account.name == account_name]
        assert accounts, f"No accounts for user: {user.email} with name {account_name}"
        return PlaidLink.get_update_link_token(accounts[0].access_token)

    @staticmethod
    def set_access_token(db: Session, user: User, public_token: str, item_data: dict) -> None:
        item = PlaidLink.get_access_token(public_token)
        account = BankAccountCreate(name=item_data["account"]["name"], user=user.id, access_token=item.access_token, item_id=item.item_id)
        BankAccountCRUD.create_bank_account(db, account)

    @staticmethod
    def get_transactions(db: Session, user: User) -> list[dict]:
        accounts = BankAccountCRUD.get_accounts_for_user(db, user.id)
        transactions = [PlaidTransactions.sync(account.access_token) for account in accounts]
        return transactions

    @staticmethod
    def get_account_info(db: Session, user: User) -> list[dict]:
        accounts = BankAccountCRUD.get_accounts_for_user(db, user.id)
        account_info = [PlaidAuth.get(account.access_token) for account in accounts]
        return account_info
