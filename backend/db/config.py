from utils.config import Config

class DatabaseConfig(Config):

    def __init__(self):
        self.db_host = Config.get_string("DB_HOST", default="localhost")
        self.db_port = Config.get_int("DB_PORT", default=5432)
        self.db_name = Config.get_string("DB_NAME")
        self.db_user = Config.get_string("DB_USER", default="admin")
        self.db_password = Config.get_string("DB_PASSWORD", default="admin")

    def get_db_url(self):
        return f"postgresql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"


database_config: DatabaseConfig = DatabaseConfig()
