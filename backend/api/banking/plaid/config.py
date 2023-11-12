import plaid
from plaid.models import Products, CountryCode
from utils.config import Config


class PlaidConfig(Config):

    def __init__(self) -> None:
        super().__init__()
        self.client_id = Config.get_string("PLAID_CLIENT_ID")
        self.secret = Config.get_string("PLAID_SECRET")
        self.env = Config.get_string("PLAID_ENV")
        self.host_url = self.__get_host()
        self.country_codes = [CountryCode(country) for country in Config.get_string(
            "PLAID_COUNTRY_CODES", default="US").split(',')]
        self.products = [Products(product) for product in Config.get_string(
            "PLAID_PRODUCTS", default="transactions").split(',')]
        self.configuration = plaid.Configuration(
            host=self.host_url,
            api_key={
                'clientId': self.client_id,
                'secret': self.secret,
                'plaidVersion': '2020-09-14'
            }
        )

    def __get_host(self) -> str:
        if self.env == 'sandbox':
            return plaid.Environment.Sandbox
        elif self.env == 'development':
            return plaid.Environment.Development
        elif self.env == 'production':
            return plaid.Environment.Production


plaid_config = PlaidConfig()
