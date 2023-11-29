from sqlalchemy.orm.session import Session
from db.schemas.user import User


class Banking:
    def get_link_token() -> dict:
        raise NotImplementedError()

    def set_access_token(db: Session, user: User, public_token: str, item_data: dict) -> None:
        raise NotImplementedError()

    def get_transactions(db: Session, user: User) -> list[dict]:
        raise NotImplementedError()
