from db.models.users import User
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from api.banking.api import BankingAPI
from api.banking.models import PublicTokenData
from utils.database_utils import get_db
from utils.logger import configure_logger, logger_config
from utils.security.auth import get_current_user


logger = configure_logger(__name__, logger_config.logging_level)

router = APIRouter(
    prefix="/banking",
    tags=["banking"],
)


@router.get("/link-token")
async def get_link_token(skip: int = 0, limit: int = 100, user: User = Depends(get_current_user)):
    return BankingAPI.get_link_token()


@router.post("/access-token")
async def post_access_token(data: PublicTokenData, skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    BankingAPI.set_access_token(db, user, data.public_token, data.metadata)


@router.get("/transactions")
async def get_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[dict]:
    return BankingAPI.get_transactions(db, user)
