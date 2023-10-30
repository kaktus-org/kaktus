from pydantic import BaseModel

class PublicTokenData(BaseModel):
    public_token: str
    metadata: dict
