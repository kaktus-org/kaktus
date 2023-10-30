import json
import os
from pathlib import Path
import time
from dotenv import load_dotenv
from sqlalchemy.orm.session import Session
import plaid
from plaid.api import plaid_api
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.products import Products
from plaid.model.country_code import CountryCode

dotenv_path = Path('.plaid-env')
load_dotenv(dotenv_path=dotenv_path)

PLAID_CLIENT_ID = os.getenv('PLAID_CLIENT_ID')
PLAID_SECRET = os.getenv('PLAID_SECRET')
PLAID_ENV = os.getenv('PLAID_ENV')
HOST = plaid.Environment.Sandbox
PLAID_PRODUCTS = os.getenv('PLAID_PRODUCTS', 'transactions').split(',')
PLAID_COUNTRY_CODES = os.getenv('PLAID_COUNTRY_CODES', 'US').split(',')

products = []
for product in PLAID_PRODUCTS:
    products.append(Products(product))

configuration = plaid.Configuration(
    host=HOST,
    api_key={
        'clientId': PLAID_CLIENT_ID,
        'secret': PLAID_SECRET,
        'plaidVersion': '2020-09-14'
    }
)

api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)

def get_link_token_from_plaid() -> dict:
    request = LinkTokenCreateRequest(
        products=products,
        client_name="Plaid Quickstart",
        country_codes=list(map(CountryCode, PLAID_COUNTRY_CODES)),
        language='en',
        user=LinkTokenCreateRequestUser(
            client_user_id=str(time.time())
        )
    )
    response = client.link_token_create(request)
    return {"link_token": response.link_token,
            "expiration": response.expiration}

def get_link_token() -> dict:
    try:
        return get_link_token_from_plaid()
    except plaid.ApiException as e:
        return json.loads(e.body)

def get_access_token_from_plaid(public_token: str) -> dict:
    request = ItemPublicTokenExchangeRequest(public_token=public_token)
    response = client.item_public_token_exchange(request)
    return {"access_token": response.access_token,
            "item_id": response.item_id}

def store_access_token(db: Session, access_token: dict, item_data: dict):
    # TODO: attribute item and access token to a user in the db
    pass

def set_access_token(db: Session, public_token: str, item_data: dict) -> dict:
    try:
        access_token = get_access_token_from_plaid(public_token)
        store_access_token(db, access_token, item_data)
    except plaid.ApiException as e:
        return json.loads(e.body)
    