import json
import plaid
from plaid.models import AuthGetRequest

from api.banking.plaid.services.client import plaid_client
from utils.logger import logger_config, configure_logger

logger = configure_logger(__name__, logger_config.logging_level)


class PlaidAuth:

    @staticmethod
    def get(access_token: str) -> dict:
        request = AuthGetRequest(access_token)
        try:
            response = plaid_client.auth_get(request)
        except plaid.ApiException as e:
            logger.error(e)
            return json.loads(e.body)
        return response.to_dict()
