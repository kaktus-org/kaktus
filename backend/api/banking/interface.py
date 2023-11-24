from sqlalchemy.orm.session import Session
from db.schemas.user import User


class Banking:
    def get_link_token() -> dict:
        pass

    def set_access_token(db: Session, user: User, public_token: str, item_data: dict) -> dict:
        pass
