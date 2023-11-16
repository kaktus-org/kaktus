from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from api.banking.api import BankingAPI
from api.banking.models import PublicTokenData
from utils.database_utils import get_db
from utils.logger import configure_logger, logger_config


logger = configure_logger(__name__, logger_config.logging_level)

router = APIRouter(
    prefix="/banking",
    tags=["banking"],
)


@router.get("/get-link-token")
async def get_link_token(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    logger.info(f"here?: '{BankingAPI}'")
    return BankingAPI.get_link_token()


@router.post("/set-access-token")
async def set_access_token(data: PublicTokenData, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return BankingAPI.set_access_token(db, data.public_token, data.metadata)
