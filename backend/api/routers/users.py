from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

<<<<<<< HEAD
from utils.database_utils import get_db
from db.crud import user
=======
from api.main import get_db
from db.crud import user as user_crud
from db.models import users
from db.schemas import user as user_schema
>>>>>>> 8369c39 (feat: Add backend support for creating a user)

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

fake_users = {1: "Harley", 2: "Lewis"}


@router.get("/")
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = user_crud.get_users(db, skip=skip, limit=limit)
    return users


@router.get("/{user_id}")
async def read_user(user_id: str):
    user_id_int = int(user_id)
    if user_id_int not in fake_users:
        raise HTTPException(status_code=404, detail="User not found")
    return f"Name is {fake_users[user_id_int]}"

@router.post("/users/", response_model=user_schema.User)
def create_user(user: user_schema.UserCreate, db: Session=Depends(get_db)):
    db_user: user_schema.User = user_crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user_crud.create_user(db=db, user=user)

