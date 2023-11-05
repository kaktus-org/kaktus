import json
import plaid
from plaid.models import TransactionsSyncRequest, TransactionsRecurringGetRequest, TransactionsSyncResponse, TransactionsRecurringGetResponse, CategoriesGetResponse
from api.banking.plaid import PlaidConfig

class PlaidTransactions:

    @staticmethod
    def sync(access_token: str) -> dict:
        #TODO: take in user id and database
        cursor = ''
        added = []
        modified = []
        removed = []
        has_more = True
        try:
            while has_more:
                request = TransactionsSyncRequest(
                    access_token=access_token,
                    cursor=cursor,
                )
                response: TransactionsSyncResponse = PlaidConfig.client.transactions_sync(request)
                added.extend(response.added)
                modified.extend(response.modified)
                removed.extend(response.removed)
                has_more = response.has_more
                cursor = response.next_cursor

            #TODO: update transactions for user in database

            return {"added": added,
                    "modified": modified,
                    "removed": removed,
                    "cursor": cursor}
        
        except plaid.ApiException as e:
            return json.loads(e.body)


    def get_reccurring(access_token: str, account_ids: list[str]) -> dict:
        #TODO take in database and user id 
        request = TransactionsRecurringGetRequest(
            access_token=access_token,
            account_ids=account_ids
        )
        try:
            response: TransactionsRecurringGetResponse = PlaidConfig.client.transactions_recurring_get(request)
            inflow = response.inflow_streams
            outflow = response.outflow_streams

            #TODO: update reccuring transactions for user in database

            return {"inflow": inflow,
                    "outflow": outflow}
        
        except plaid.ApiException as e:
            return json.loads(e.body)
        
    def get_categories() -> dict:
        try:
            response: CategoriesGetResponse = PlaidConfig.client.categories_get({})
            categories = response.categories

            return categories
        except plaid.ApiException as e:
            return json.loads(e.body)