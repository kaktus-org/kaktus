from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from api.main import get_db
from api.banking import banking_api
from api.banking.banking_data import PublicTokenData

router = APIRouter(
    prefix="/banking",
    tags=["banking"],
)

@router.get("/get-link-token")
async def get_link_token(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return banking_api.get_link_token()

@router.post("/set-access-token")
async def set_access_token(data: PublicTokenData, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return banking_api.set_access_token(db, data.public_token, data.metadata)
