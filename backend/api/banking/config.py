from api.banking.banking_interface import Banking
from api.banking.plaid import PlaidBanking

class BankingConfig:
    banking_api: Banking = PlaidBanking