from utils.config import Config


class AuthConfig(Config):

    def __init__(self):
        self.secret_key = Config.get_string("SECRET_KEY", default="notasecret")
        self.csrf_secret_key = Config.get_string("CSRF_SECRET_KEY", default="notasecret")
        self.algorithm = Config.get_string("ALGORITHM", "HS256")
        self.csrf_algorithm = Config.get_string("CSRF_ALGORITHM", "HS256")
        self.access_token_expire_mins = Config.get_int("ACCESS_TOKEN_EXPIRE_MINS", default=1)
        self.refresh_token_expires_days = Config.get_int("REFRESH_TOKEN_EXPIRES_DAYS", default=7)


auth_config: AuthConfig = AuthConfig()
