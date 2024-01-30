from utils.config import Config


class AuthConfig(Config):

    def __init__(self):
        self.secret_key = Config.get_string("SECRET_KEY", default="notasecret")
        self.csrf_secret_key = Config.get_string("CSRF_SECRET_KEY", default="notasecret")
        self.algorithm = Config.get_string("ALGORITHM", "HS256")
        self.csrf_algorithm = Config.get_string("CSRF_ALGORITHM", "HS256")
        self.access_token_expire_mins = Config.get_int("ACCESS_TOKEN_EXPIRE_MINS", default=30)

    def get_db_url(self):
        return f"postgresql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"


auth_config: AuthConfig = AuthConfig()
