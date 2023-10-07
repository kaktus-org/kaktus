from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.main import get_db
from db.crud import user

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

fake_users = {1: "Harley", 2: "Lewis"}

@router.get("/")
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = user.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/{user_id}")
async def read_user(user_id: str):
    user_id_int = int(user_id)
    if user_id_int not in fake_users:
        raise HTTPException(status_code=404, detail="User not found")
    return f"Name is {fake_users[user_id_int]}"
