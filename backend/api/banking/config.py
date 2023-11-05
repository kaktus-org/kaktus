from utils.config import Config
from api.banking.banking_interface import Banking
from api.banking.plaid import PlaidBanking

class BankingConfig:
    api_name = Config.get_string("BANKING_API")
    if api_name == "plaid":
        api: Banking = PlaidBanking