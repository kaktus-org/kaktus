from datetime import datetime, timedelta

from fastapi import Depends
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from db.crud.user import UserCRUD
from db.models.users import User
from utils.database_utils import get_db
from utils.security.config import auth_config


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

authorisation_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    '''
        Get the current user by their JWT token. If the token is invalid, raise an authorisation exception,
        else, return the users email address. Use this function to authorise API requests.

        TODO: Extend this flow to implement RBAC
    '''
    email = verify_token(token)
    user = UserCRUD.get_user_by_email(db, email)
    if user is None:
        raise authorisation_exception
    return user


def create_jwt_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=auth_config.access_token_expire_mins)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, auth_config.secret_key, algorithm=auth_config.algorithm)
    return encoded_jwt


def verify_token(token: str) -> str:
    '''
        Verify a given JWT token and return the associated email. If it is not valid, raise an authorisation exception.
    '''
    try:
        payload = jwt.decode(token, auth_config.secret_key, algorithms=[auth_config.algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise authorisation_exception
        return email
    except JWTError:
        raise authorisation_exception