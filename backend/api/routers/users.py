from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from utils.database_utils import get_db
from db.crud.user import create_user
from db.crud.user import get_user, get_users, get_user_by_email
from db.schemas.user import User, UserCreate

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("/")
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = get_users(db=db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user: User = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)


@router.get("/{user_id}")
async def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
