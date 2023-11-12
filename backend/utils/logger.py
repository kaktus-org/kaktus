import logging
from multipledispatch import dispatch
import os

from utils.config import Config


class LoggerConfig(Config):

    def __init__(self):
        self.logging_level: int = LoggerConfig.get_log_level(
            "LOGGING_LEVEL", logging.INFO)

    @staticmethod
    def get_log_level(key, default=None):
        value = os.environ.get(key, None)

        if value is None:
            return default

        level_names = {
            "CRITICAL": logging.CRITICAL,
            "FATAL": logging.FATAL,
            "ERROR": logging.ERROR,
            "WARNING": logging.WARNING,
            "WARN": logging.WARNING,
            "INFO": logging.INFO,
            "DEBUG": logging.DEBUG,
            "NOTSET": logging.NOTSET,
        }

        try:
            if value.isnumeric():
                log_level = int(value)
            else:
                log_level = level_names.get(value.upper())
        except (ValueError, TypeError):
            return default

        return log_level


logger_config: LoggerConfig = LoggerConfig()


@dispatch(str, int)
def configure_logger(name: str, level: int) -> logging.Logger:
    logging.basicConfig(
        level=level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )

    return logging.getLogger(name)


@dispatch(str, str)
def configure_logger(name: str, level: str) -> logging.Logger:
    logging.basicConfig(
        level=level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )

    return logging.getLogger(name)
