from utils.config import Config


class DatabaseConfig(Config):

    def __init__(self):
        self.db_env = Config.get_string("DB_ENV", default="local")
        host = "LOCAL_DB_HOST"
        port = "LOCAL_DB_PORT"
        name = "LOCAL_DB_NAME"
        user = "LOCAL_DB_USER"
        password = "LOCAL_DB_PASSWORD"
        if self.db_env == "live":
            host = "LIVE_DB_HOST"
            port = "LIVE_DB_PORT"
            name = "LIVE_DB_NAME"
            user = "LIVE_DB_USER"
            password = "LIVE_DB_PASSWORD"
        self.db_host = Config.get_string(host, default="localhost")
        self.db_port = Config.get_int(port, default=5432)
        self.db_name = Config.get_string(name)
        self.db_user = Config.get_string(user, default="admin")
        self.db_password = Config.get_string(password, default="admin")

    def get_db_url(self):
        return f"postgresql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"


database_config: DatabaseConfig = DatabaseConfig()
