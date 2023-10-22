from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session

from .config import database_config
from utils.logger import logger_config, configure_logger


logger = configure_logger(__name__, logger_config.logging_level)

engine = create_engine(
    database_config.get_db_url()
)

logger.info(f"Creating local session '{engine.url}'")
SessionLocal: Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
