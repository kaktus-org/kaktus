from utils.config import Config
from api.banking.interface import Banking
from api.banking.plaid.banking import PlaidBanking


class BankingConfig(Config):

    def __init__(self) -> None:
        super().__init__()
        self.api_name = Config.get_string("BANKING_API")
        self.api = self.__get_api()

    def __get_api(self) -> Banking:
        if self.api_name == "plaid":
            return PlaidBanking


banking_config = BankingConfig()
