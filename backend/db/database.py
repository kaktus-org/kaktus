import logging

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session

logger = logging.getLogger(__name__)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

SQLALCHEMY_DATABASE_URL: str = "postgresql://admin:admin@yampacked-database-1/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

logger.info(f"Creating local session '{engine.url}'")
SessionLocal: Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
