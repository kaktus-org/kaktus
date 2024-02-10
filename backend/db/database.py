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

if database_config.db_env == "local":
    logger.info(f"Creating local session '{engine.url}'")
elif database_config.db_env == "live":
    logger.info(f"Connecting to live session '{engine.url}'")

SessionLocal: Session = sessionmaker(
    autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
