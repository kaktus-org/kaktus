import json
import plaid
from plaid.models import LiabilitiesGetRequest, LiabilitiesGetResponse
from api.banking.plaid.services.client import plaid_client

class PlaidLiabilities:

    @staticmethod
    def get_liabilities(access_token: str) -> dict:
        request = LiabilitiesGetRequest(access_token=access_token)
        try:
            response: LiabilitiesGetResponse = plaid_client.liabilities_get(request)
            
            return response
        except plaid.ApiException as e:            
            return json.loads(e.body)
        