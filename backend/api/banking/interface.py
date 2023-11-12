from sqlalchemy.orm.session import Session


class Banking:
    def get_link_token() -> dict:
        pass

    def set_access_token(db: Session, public_token: str, item_data: dict) -> dict:
        pass
