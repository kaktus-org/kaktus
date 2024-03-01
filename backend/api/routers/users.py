from db.models.refresh_tokens import RefreshToken
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from utils.security import auth

from db.crud.user import UserCRUD
from db.crud.refresh_token import RefreshTokenCRUD
from db.schemas.user import User, UserCreate
from db.schemas.role import RoleName  # noqa
from utils.database_utils import get_db
from utils.logger import configure_logger, logger_config
from utils.security import cryptography


logger = configure_logger(__name__, logger_config.logging_level)

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("/")
async def read_users(skip: int = 0,
                     limit: int = 100,
                     _: User = Depends(auth.has_permission(["admin"])),  # TODO: make use of the RoleName enum
                     db: Session = Depends(get_db)):
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
    user: User = UserCRUD.get_user_by_email(db, form_data.username)
    if not user or not cryptography.verify_password(form_data.password, user.hashed_password):
        raise auth.authorisation_exception

    csrf_token = auth.create_csrf_token(data={"sub": user.email})
    access_token_str, refresh_token_str, refresh_token = auth.generate_auth_tokens(user, UserCRUD.get_user_roles(db, user.id))
    RefreshTokenCRUD.create_refresh_token(db, refresh_token)

    # TODO: samesite = none is not best practice, investigate way round this with nginx
    response.set_cookie(key="access_token", value=f"Bearer {access_token_str}", httponly=True, samesite="none", secure=True)
    response.set_cookie(key="refresh_token", value=f"Bearer {refresh_token_str}", httponly=True, samesite="none", secure=True)

    return csrf_token


@router.post("/logout")
async def logout(response: Response, user: User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    RefreshTokenCRUD.delete_all_refresh_tokens_by_user_id(db, user.id)
    response.delete_cookie("access_token", secure=True, samesite="none")
    response.delete_cookie("refresh_token", secure=True, samesite="none")

    return {"message": "Logged out successfully"}


@router.post("/refresh")
async def refresh_token(request: Request, response: Response, db: Session = Depends(get_db)):
    token_no_bearer = request.cookies.get("refresh_token").replace("Bearer ", "", 1)
    token_jti = auth.extract_jti_from_token(token_no_bearer)

    refresh_token: RefreshToken = RefreshTokenCRUD.get_refresh_token_by_jti(db, token_jti)
    if not refresh_token or not auth.is_refresh_token_valid(refresh_token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired refresh token")

    user: User = UserCRUD.get_user(db, user_id=refresh_token.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    csrf_token = auth.create_csrf_token(data={"sub": user.email})
    access_token_str, new_refresh_token_str, new_refresh_token = auth.generate_auth_tokens(user, UserCRUD.get_user_roles(db, user.id))

    RefreshTokenCRUD.delete_refresh_token(db, token_jti)
    RefreshTokenCRUD.create_refresh_token(db, new_refresh_token)

    response.set_cookie(key="access_token", value=f"Bearer {access_token_str}", httponly=True, samesite="none", secure=True)
    response.set_cookie(key="refresh_token", value=f"Bearer {new_refresh_token_str}", httponly=True, samesite="none", secure=True)
    return csrf_token
