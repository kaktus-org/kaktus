import logging

from utils.config import Config

class LoggerConfig(Config):
    def __init__(self):
        self.logging_level = Config.get_int("LOGGING_LEVEL", logging.INFO)


logger_config: LoggerConfig = LoggerConfig()

def configure_logger(name: str, level: int) -> logging.Logger:
    logging.basicConfig(
        level=level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )

    return logging.getLogger(name)

