from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from utils.security import auth

from db.crud.user import UserCRUD
from db.schemas.user import User, UserCreate
from utils.database_utils import get_db
from utils.logger import configure_logger, logger_config
from utils.security import cryptography


logger = configure_logger(__name__, logger_config.logging_level)

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("/")
async def read_users(skip: int = 0, limit: int = 100, _: User = Depends(auth.get_current_user), db: Session = Depends(get_db), token: str = Depends(auth.oauth2_scheme)):
    users = UserCRUD.get_users(db=db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user: User = UserCRUD.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    return UserCRUD.create_user(db=db, user=user)


@router.get("/{user_id}")
async def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = UserCRUD.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/login")
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = UserCRUD.get_user_by_email(db, form_data.username)
    if not user or not cryptography.verify_password(form_data.password, user.hashed_password):
        raise auth.authorisation_exception
    access_token = auth.create_jwt_token(data={"sub": user.email})
    # TODO: samesite = none is not best practice, investigate way round this with nginx
    response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, samesite="none", secure=True)
