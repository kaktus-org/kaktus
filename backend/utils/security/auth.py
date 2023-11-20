from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from fastapi import HTTPException, status

from utils.security.config import auth_config

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

authorisation_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def hash_password(password: str) -> str:
    '''
        Return the result of generating a salt and hashing the given password + that salt
    '''
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


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
