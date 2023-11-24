from sqlalchemy.orm.session import Session

from api.banking.interface import Banking
from api.banking.plaid.services import PlaidLink
from db.crud.bank_account import BankAccountCRUD
from db.schemas.bank_account import BankAccountCreate
from db.schemas.user import User


class PlaidBanking(Banking):

    @staticmethod
    def get_link_token() -> dict:
        return PlaidLink.get_link_token()

    @staticmethod
    def set_access_token(db: Session, user: User, public_token: str, item_data: dict) -> None:
        item = PlaidLink.get_access_token(public_token)
        account = BankAccountCreate(name=item_data["account"]["name"], user=user.id, access_token=item.access_token, item_id=item.item_id)
        BankAccountCRUD.create_bank_account(db, account)
