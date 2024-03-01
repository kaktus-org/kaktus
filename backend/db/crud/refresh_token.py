from typing import List

from db.models.refresh_tokens import RefreshToken
from sqlalchemy.orm import Session
from utils.statics import StaticClass


class RefreshTokenCRUD(metaclass=StaticClass):

    @staticmethod
    def create_refresh_token(db: Session, refresh_token: RefreshToken):
        db.add(refresh_token)
        db.commit()
        db.refresh(refresh_token)
        return refresh_token

    @staticmethod
    def get_refresh_tokens_by_user_id(db: Session, user_id: int) -> List[RefreshToken]:
        return db.query(RefreshToken).filter_by(user_id=user_id).all()

    @staticmethod
    def get_refresh_token_by_jti(db: Session, token_jti: str) -> RefreshToken:
        return db.query(RefreshToken).filter(RefreshToken.token_jti == token_jti).first()

    @staticmethod
    def delete_refresh_token(db: Session, token_jti: str):
        refresh_token_obj = db.query(RefreshToken).filter(RefreshToken.token_jti == token_jti).first()
        if refresh_token_obj:
            db.delete(refresh_token_obj)
            db.commit()

    @staticmethod
    def delete_all_refresh_tokens_by_user_id(db: Session, user_id: int):
        refresh_tokens = RefreshTokenCRUD.get_refresh_tokens_by_user_id(db, user_id)
        for refresh_token in refresh_tokens:
            db.delete(refresh_token)
        db.commit()
