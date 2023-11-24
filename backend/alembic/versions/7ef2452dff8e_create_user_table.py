"""create user table

Revision ID: 7ef2452dff8e
Revises:
Create Date: 2023-11-16 21:16:03.284869

"""
from typing import Sequence, Union

from alembic import op
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey


# revision identifiers, used by Alembic.
revision: str = "7ef2452dff8e"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        Column("id", Integer, primary_key=True, index=True, nullable=False),
        Column("email", String, unique=True, index=True, nullable=False),
        Column("hashed_password", String, nullable=False),
        Column("is_active", Boolean, default=True, nullable=False)
    )
    op.create_table(
        "bank_accounts",
        Column("id", Integer, primary_key=True, index=True, nullable=False),
        Column("name", String, nullable=False),
        Column("item_id", String, nullable=False),
        Column("user", Integer, ForeignKey("users.id"), nullable=False),
        Column("access_token", String(150), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("bank_accounts")
    op.drop_table("users")
