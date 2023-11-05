import json
import time
from sqlalchemy.orm.session import Session
import plaid
from plaid.models import LinkTokenCreateRequest, LinkTokenCreateRequestUser, ItemPublicTokenExchangeRequest
from api.banking.banking_interface import Banking
from api.banking.plaid import PlaidConfig, PlaidLiabilities, PlaidTransactions

class PlaidBanking(Banking):
    
    @staticmethod
    def get_link_token_from_plaid() -> dict:
        request = LinkTokenCreateRequest(
            products=PlaidConfig.products,
            client_name="client",
            country_codes=PlaidConfig.country_codes,
            language='en',
            user=LinkTokenCreateRequestUser(
                client_user_id=str(time.time())
            )
        )
        response = PlaidConfig.client.link_token_create(request)
        return {"link_token": response.link_token,
                "expiration": response.expiration}

    @staticmethod
    def get_link_token() -> dict:
        try:
            return PlaidBanking.get_link_token_from_plaid()
        except plaid.ApiException as e:
            return json.loads(e.body)

    @staticmethod
    def get_access_token_from_plaid(public_token: str) -> dict:
        request = ItemPublicTokenExchangeRequest(public_token=public_token)
        response = PlaidConfig.client.item_public_token_exchange(request)
        return {"access_token": response.access_token,
                "item_id": response.item_id}

    @staticmethod
    def store_access_token(db: Session, access_token: dict, item_data: dict) -> dict:
        # TODO: attribute item and access token to a user in the db
        print(item_data)
        print(PlaidTransactions.sync(access_token["access_token"]))
        account_ids = list(map(lambda x : x['id'], item_data['accounts']))
        print(PlaidTransactions.get_reccurring(access_token["access_token"], account_ids))
        PlaidTransactions.get_categories()
        print(PlaidLiabilities.get_liabilities(access_token["access_token"]))
        return {}

    @staticmethod
    def set_access_token(db: Session, public_token: str, item_data: dict) -> dict:
        try:
            access_token = PlaidBanking.get_access_token_from_plaid(public_token)
            return PlaidBanking.store_access_token(db, access_token, item_data)
        except plaid.ApiException as e:
            return json.loads(e.body)
        