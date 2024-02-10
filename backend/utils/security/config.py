from utils.config import Config


class AuthConfig(Config):

    def __init__(self):
        self.secret_key = Config.get_string("SECRET_KEY", default="notasecret")
        self.algorithm = Config.get_string("ALGORITHM", "HS256")
        self.access_token_expire_mins = Config.get_int("ACCESS_TOKEN_EXPIRE_MINS", default=30)


auth_config: AuthConfig = AuthConfig()
