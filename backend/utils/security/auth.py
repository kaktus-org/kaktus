from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from db.crud.user import UserCRUD
from db.models.users import User
from utils.database_utils import get_db
from utils.security.config import auth_config
from utils.security.oauth2 import OAuth2PasswordBearerWithCookie, OAuth2CSRFBearer


oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="/users/login")
oauth2_csrf_scheme = OAuth2CSRFBearer(tokenUrl="/users/login")

authorisation_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

permission_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="You do not have permission to perform this action",
    headers={"WWW-Authenticate": "Bearer"},
)


async def get_current_user(token: str = Depends(oauth2_scheme), csrf_token: str = Depends(oauth2_csrf_scheme), db: Session = Depends(get_db)) -> User:
    '''
        Get the current user by their JWT token. If the token is invalid, raise an authorisation exception,
        else, return the users email address. Use this function to authorise API requests.
    '''
    email, roles = verify_token(token)
    user = UserCRUD.get_user_by_email(db, email)
    if user is None or email != verify_csrf_token(csrf_token):
        raise authorisation_exception
    user.token_roles = roles  # TODO: might be good to document this stuff somewhere, this transient field and the stateless nature of our flow
    return user


def create_jwt_token(data: dict, roles: list) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=auth_config.access_token_expire_mins)
    to_encode.update({"exp": expire, "roles": roles})
    encoded_jwt = jwt.encode(to_encode, auth_config.secret_key, algorithm=auth_config.algorithm)
    return encoded_jwt


def create_csrf_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=auth_config.access_token_expire_mins)
    to_encode.update({"exp": expire})
    csrf_token = jwt.encode(to_encode, auth_config.csrf_secret_key, algorithm=auth_config.csrf_algorithm)
    return csrf_token


def verify_token(token: str) -> (str, list):
    '''
        Verify a given JWT token and return the associated email. If it is not valid, raise an authorisation exception.
    '''
    try:
        payload = jwt.decode(token, auth_config.secret_key, algorithms=[auth_config.algorithm])
        email: str = payload.get("sub")
        roles: list = payload.get("roles", [])
        if email is None:
            raise authorisation_exception

        return email, roles
    except JWTError:
        raise authorisation_exception


def verify_csrf_token(csrf_token: str) -> str:
    try:
        payload = jwt.decode(csrf_token, auth_config.csrf_secret_key, algorithms=[auth_config.csrf_algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise authorisation_exception
        return email
    except JWTError:
        raise authorisation_exception


def has_permission(required_roles: list):
    def role_checker(user: User = Depends(get_current_user)):
        if not set(required_roles).intersection(set(user.token_roles)):
            raise permission_exception

        return user
    return role_checker
