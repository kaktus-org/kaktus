import time
import json
import plaid
from plaid.models import LinkTokenCreateRequest, LinkTokenCreateRequestUser, ItemPublicTokenExchangeRequest, LinkTokenCreateResponse, ItemPublicTokenExchangeResponse
from api.banking.plaid.config import plaid_config
from api.banking.plaid.services.client import plaid_client
from utils.logger import logger_config, configure_logger
from utils.statics import StaticClass


logger = configure_logger(__name__, logger_config.logging_level)


class PlaidLink(metaclass=StaticClass):

    @staticmethod
    def get_link_token() -> dict:
        request = LinkTokenCreateRequest(
            products=plaid_config.products,
            client_name="client",
            country_codes=plaid_config.country_codes,
            language="en",
            user=LinkTokenCreateRequestUser(
                client_user_id=str(time.time())
            )
        )
        try:
            response: LinkTokenCreateResponse = plaid_client.link_token_create(request, async_req=True).get()
        except plaid.ApiException as e:
            logger.error(e)
            return json.loads(e.body)

        return {"link_token": response.link_token,
                "expiration": response.expiration}

    @staticmethod
    def get_access_token(public_token: str) -> ItemPublicTokenExchangeResponse:
        request = ItemPublicTokenExchangeRequest(public_token=public_token)
        try:
            return plaid_client.item_public_token_exchange(request, async_req=True).get()
        except plaid.ApiException as e:
            logger.error(e)
            return json.loads(e.body)
