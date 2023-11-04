import logging
import os

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)


class Config:

    @staticmethod
    def get_string(key: str, default: str = None):
        value = os.environ.get(key, None)
        
        if value is None:
            logger.warning(f"Environment variable '{key}' not found; using default '{default}'")
            return default
        
        return value
    
    @staticmethod
    def get_int(key: str, default: int = None):
        value = os.environ.get(key, None)

        if value is None:
            logger.warning(f"Environment variable '{key}' not found; using default '{default}'")
            return default

        try:
            return int(value)
        except (ValueError, TypeError):
            logger.warning("Failed to cast environment variable '{key}' to an integer; using default value '{default}'")
            return default

    @staticmethod
    def get_bool(key: str, default: bool = None):
        value = os.environ.get(key, None)

        if value is None:
            logger.warning(f"Environment variable '{key}' not found; using default '{default}'")
            return default

        try:
            return bool(value)
        except (ValueError, TypeError):
            logger.warning(f"Failed to cast environment variable '{key}' to a boolean; using default value '{default}'")
            return default
