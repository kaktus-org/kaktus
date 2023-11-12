import json
import plaid
from plaid.models import LiabilitiesGetRequest, LiabilitiesGetResponse
from api.banking.plaid.services.client import plaid_client
from utils.logger import logger_config, configure_logger

logger = configure_logger(__name__, logger_config.logging_level)


class PlaidLiabilities:

    @staticmethod
    def get_liabilities(access_token: str) -> dict:
        request = LiabilitiesGetRequest(access_token=access_token)
        try:
            response: LiabilitiesGetResponse = plaid_client.liabilities_get(
                request)
        except plaid.ApiException as e:
            logger.error(e)
            return json.loads(e.body)

        return response
