import json
import os
from pathlib import Path
import time
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
import plaid
from plaid.api import plaid_api
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products
from plaid.model.country_code import CountryCode

from api.main import get_db

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

router = APIRouter(
    prefix="/plaid",
    tags=["plaid"],
)

@router.get("/get-link-token")
async def get_link_token(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        request = LinkTokenCreateRequest(
            products=products,
            client_name="Plaid Quickstart",
            country_codes=list(map(lambda x: CountryCode(x), PLAID_COUNTRY_CODES)),
            language='en',
            user=LinkTokenCreateRequestUser(
                client_user_id=str(time.time())
            )
        )
        response = client.link_token_create(request)
        return response.to_dict()
    except plaid.ApiException as e:
        return json.loads(e.body)
