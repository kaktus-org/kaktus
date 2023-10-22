from utils.config import Config

class APIConfig(Config):

    def __init__(self):
        self.host = Config.get_string("API_HOST", default="localhost")
        self.port = Config.get_int("API_PORT", default=8000)


api_config: APIConfig = APIConfig()
