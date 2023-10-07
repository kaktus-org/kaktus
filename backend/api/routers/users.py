from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.api.main import get_db

from backend.db.models import users as users_model
from backend.db.schemas import user as user_schema
from backend.db.crud import user as user_crud

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

fake_users = {1: "Harley", 2: "Lewis"}

@router.get("/")
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return "All users here.."

@router.get("/{user_id}")
async def read_user(user_id: str):
    user_id_int = int(user_id)
    if user_id_int not in fake_users:
        raise HTTPException(status_code=404, detail="User not found")
    return f"Name is {fake_users[user_id_int]}"
