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
async def get_link_token(_: User = Depends(get_current_user)):
    return BankingAPI.get_link_token()


@router.get("/liability-link-token")
async def get_liability_link_token(_: User = Depends(get_current_user)):
    return BankingAPI.get_liability_link_token()


@router.get("/income-link-token")
async def get_income_link_token(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return BankingAPI.get_income_link_token(db, user)


@router.get("/update-link-token")
async def get_update_link_token(account_name: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return BankingAPI.get_update_link_token(db, user, account_name)


@router.post("/access-token")
async def post_access_token(data: PublicTokenData, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    BankingAPI.set_access_token(db, user, data.public_token, data.metadata)


@router.get("/transactions")
async def get_transactions(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[dict]:
    return BankingAPI.get_transactions(db, user)


@router.get("/account-info")
async def get_account_info(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[dict]:
    return BankingAPI.get_account_info(db, user)


@router.get("/account-balances")
async def get_account_balances(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[dict]:
    return BankingAPI.get_balances(db, user)


@router.get("/income-user-token")
async def get_income_user_token(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> str:
    return BankingAPI.get_user_income_token(db, user)
