from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from db.crud.user import UserCRUD
from db.schemas.user import User, UserCreate
from utils.database_utils import get_db
from utils.logger import configure_logger, logger_config
import utils.security.auth as auth


logger = configure_logger(__name__, logger_config.logging_level)

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


async def get_current_user(token: str = Depends(auth.oauth2_scheme), db: Session = Depends(get_db)) -> User:
    '''
        Get the current user by their JWT token. If the token is invalid, raise an authorisation exception,
        else, return the users email address. Use this function to authorise API requests.

        TODO: Extend this flow to implement RBAC
    '''
    email = auth.verify_token(token)
    user = UserCRUD.get_user_by_email(db, email)
    if user is None:
        raise auth.authorisation_exception
    return user


@router.get("/")
async def read_users(skip: int = 0, limit: int = 100, _: User = Depends(get_current_user), db: Session = Depends(get_db), token: str = Depends(auth.oauth2_scheme)):
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
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = UserCRUD.get_user_by_email(db, form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise auth.authorisation_exception
    access_token = auth.create_jwt_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
