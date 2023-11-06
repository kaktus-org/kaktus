from sqlalchemy.orm.session import Session
from api.banking.interface import Banking
from api.banking.plaid.services import PlaidLink, PlaidLiabilities, PlaidTransactions

class PlaidBanking(Banking):
    
    @staticmethod
    def get_link_token() -> dict:
        return PlaidLink.get_link_token()

    
    @staticmethod
    def set_access_token(db: Session, public_token: str, item_data: dict) -> dict:
        access_token = PlaidLink.get_access_token_from_plaid(public_token)
        return PlaidBanking.store_access_token(db, access_token, item_data)


    @staticmethod
    def store_access_token(db: Session, access_token: dict, item_data: dict) -> dict:
        # TODO: attribute item and access token to a user in the db
        print(item_data)
        print(PlaidTransactions.sync(access_token["access_token"]))
        account_ids = [account['id'] for account in item_data['accounts']]
        print(PlaidTransactions.get_reccurring(access_token["access_token"], account_ids))
        PlaidTransactions.get_categories()
        print(PlaidLiabilities.get_liabilities(access_token["access_token"]))
        return {}
