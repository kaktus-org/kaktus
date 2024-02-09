import random
import sys
import plaid
from plaid.models import UserCreateRequest, UserCreateResponse
from api.banking.plaid.services.client import plaid_client
from utils.logger import logger_config, configure_logger

logger = configure_logger(__name__, logger_config.logging_level)

RETRY_LIMIT = 5


class PlaidIncome:

    @staticmethod
    def create_income_user_token(user_id: str, _retries=0) -> dict:
        request = UserCreateRequest(client_user_id=str(user_id))
        try:
            response: UserCreateResponse = plaid_client.user_create(request)
        except plaid.ApiException as e:
            logger.error(e)
            # If the uder_id is already in use, use random id
            if _retries < RETRY_LIMIT:
                return PlaidIncome.create_income_user_token(str(random.randint(100000000000, sys.maxsize)), _retries + 1)
            raise Exception("Cannot create income user token")

        return response.user_token
