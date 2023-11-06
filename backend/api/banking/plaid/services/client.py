import plaid
from plaid.api import plaid_api
from api.banking.plaid.config import plaid_config

plaid_api_client = plaid.ApiClient(plaid_config.configuration)
plaid_client = plaid_api.PlaidApi(plaid_api_client)
