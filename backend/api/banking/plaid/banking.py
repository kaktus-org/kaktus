from sqlalchemy.orm.session import Session

from api.banking.interface import Banking
from api.banking.plaid.services import PlaidLink, PlaidTransactions, PlaidAuth, PlaidBalance, PlaidIncome
from db.crud.user import UserCRUD
from db.crud.bank_account import BankAccountCRUD
from db.schemas.bank_account import BankAccountCreate
from db.schemas.user import User


class PlaidBanking(Banking):

    @staticmethod
    def get_link_token() -> dict:
        return PlaidLink.get_link_token()

    @staticmethod
    def get_income_link_token(db: Session, user: User) -> dict:
        token = user.income_token
        if token is None:
            token = PlaidBanking.get_user_income_token(db, user)
        return PlaidLink.get_income_link_token(token)

    @staticmethod
    def get_liability_link_token() -> dict:
        return PlaidLink.get_liability_link_token()

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

    @staticmethod
    def get_balances(db: Session, user: User) -> list[dict]:
        accounts = BankAccountCRUD.get_accounts_for_user(db, user.id)
        balances = [PlaidBalance.get_balance(account.access_token) for account in accounts]
        return balances

    @staticmethod
    def get_user_income_token(db: Session, user: User) -> str:
        if user.income_token:
            return user.income_token
        income_token = PlaidIncome.create_income_user_token(user.id)
        UserCRUD.add_income_token(db, user, income_token)
        return income_token
