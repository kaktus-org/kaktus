from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from api.main import get_db
from api.common import plaid_wrapper

router = APIRouter(
    prefix="/bank",
    tags=["bank"],
)

@router.get("/get-link-token")
async def get_link_token(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return plaid_wrapper.get_link_token()
