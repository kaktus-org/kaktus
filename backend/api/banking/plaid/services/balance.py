import json
import plaid
from plaid.models import AccountsBalanceGetRequest
from api.banking.plaid.services.client import plaid_client
from utils.logger import logger_config, configure_logger

logger = configure_logger(__name__, logger_config.logging_level)


class PlaidBalance:

    @staticmethod
    def get_balance(access_token: str) -> dict:
        request = AccountsBalanceGetRequest(access_token=access_token)
        try:
            response = plaid_client.accounts_balance_get(request)
        except plaid.ApiException as e:
            logger.error(e)
            return json.loads(e.body)

        return response.to_dict()
