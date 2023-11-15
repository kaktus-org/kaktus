from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.crud.user import UserCRUD
from db.schemas.user import User, UserCreate
from utils.database_utils import get_db
from utils.logger import configure_logger, logger_config


logger = configure_logger(__name__, logger_config.logging_level)

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("/")
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = UserCRUD.get_users(db=db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user: User = UserCRUD.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return UserCRUD.create_user(db=db, user=user)


@router.get("/{user_id}")
async def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = UserCRUD.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
