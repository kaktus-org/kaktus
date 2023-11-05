import json
import plaid
from plaid.models import LiabilitiesGetRequest, LiabilitiesGetResponse
from api.banking.plaid import PlaidConfig

class PlaidLiabilities:

    def get_liabilities(access_token: str) -> dict:
        request = LiabilitiesGetRequest(
            access_token=access_token
        )
        try:
            response: LiabilitiesGetResponse = PlaidConfig.client.liabilities_get(request)
            
            return response
        except plaid.ApiException as e:
            return json.loads(e.body)
        