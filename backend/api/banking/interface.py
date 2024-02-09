from sqlalchemy.orm.session import Session
from db.schemas.user import User


class Banking:
    def get_link_token() -> dict:
        raise NotImplementedError()

    def get_liability_link_token() -> dict:
        raise NotImplementedError()

    def get_income_link_token(db: Session, user: User) -> dict:
        raise NotImplementedError()

    def get_update_link_token(db: Session, user: User, account_name: str) -> dict:
        raise NotImplementedError()

    def set_access_token(db: Session, user: User, public_token: str, item_data: dict) -> None:
        raise NotImplementedError()

    def get_transactions(db: Session, user: User) -> list[dict]:
        raise NotImplementedError()

    def get_account_info(db: Session, user: User) -> list[dict]:
        raise NotImplementedError()

    def get_balances(db: Session, user: User) -> list[dict]:
        raise NotImplementedError()

    def get_user_income_token(db: Session, user: User) -> str:
        raise NotImplementedError()
