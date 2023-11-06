import json
import plaid
from plaid.models import TransactionsSyncRequest, TransactionsRecurringGetRequest, TransactionsSyncResponse, TransactionsRecurringGetResponse, CategoriesGetResponse
from api.banking.plaid.services.client import plaid_client
from utils.logger import logger_config, configure_logger

logger = configure_logger(__name__, logger_config.logging_level)

class PlaidTransactions:

    @staticmethod
    def sync(access_token: str) -> dict:
        cursor = ''
        added = []
        modified = []
        removed = []
        has_more = True
        while has_more:
            request = TransactionsSyncRequest(
                access_token=access_token,
                cursor=cursor,
            )
            try:
                response: TransactionsSyncResponse = plaid_client.transactions_sync(request)
            except plaid.ApiException as e:
                logger.error(e)
                return json.loads(e.body)           
            
            added.extend(response.added)
            modified.extend(response.modified)
            removed.extend(response.removed)
            has_more = response.has_more
            cursor = response.next_cursor

        return {"added": added,
                "modified": modified,
                "removed": removed,
                "cursor": cursor}


    @staticmethod
    def get_reccurring(access_token: str, account_ids: list[str]) -> dict:
        request = TransactionsRecurringGetRequest(
            access_token=access_token,
            account_ids=account_ids
        )
        try:
            response: TransactionsRecurringGetResponse = plaid_client.transactions_recurring_get(request)
        except plaid.ApiException as e:
            logger.error(e)
            return json.loads(e.body)

        inflow = response.inflow_streams
        outflow = response.outflow_streams

        return {"inflow": inflow,
                "outflow": outflow}


    @staticmethod
    def get_categories() -> dict:
        try:
            response: CategoriesGetResponse = plaid_client.categories_get({})
        except plaid.ApiException as e:
            logger.error(e)
            return json.loads(e.body)

        categories = response.categories

        return categories