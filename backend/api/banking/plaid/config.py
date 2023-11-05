import plaid
from plaid.api import plaid_api
from plaid.models import Products, CountryCode
from utils.config import Config

class PlaidConfig:
    client_id = Config.get_string("PLAID_CLIENT_ID")
    secret = Config.get_string("PLAID_SECRET")
    env = Config.get_string("PLAID_ENV")
    if env == 'sandbox':
        host = plaid.Environment.Sandbox
    elif env == 'development':
        host = plaid.Environment.Development
    elif env == 'production':
        host = plaid.Environment.Production
    country_codes = list(map(CountryCode, Config.get_string("PLAID_COUNTRY_CODES", default="US").split(',')))
    products = []
    for product in Config.get_string("PLAID_PRODUCTS", default="transactions").split(','):
        products.append(Products(product))
    configuration = plaid.Configuration(
        host=host,
        api_key={
            'clientId': client_id,
            'secret': secret,
            'plaidVersion': '2020-09-14'
        }
    )
    api_client = plaid.ApiClient(configuration)
    client = plaid_api.PlaidApi(api_client)
