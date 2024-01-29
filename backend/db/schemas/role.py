from enum import Enum

from pydantic import BaseModel


class RoleName(Enum):
    ADMIN = "admin"
    USER = "user"


class RoleBase(BaseModel):
    name: RoleName

    class Config:
        use_enum_values = True


class RoleCreate(RoleBase):
    pass


class Role(RoleBase):
    id: int

    class Config:
        orm_mode = True
