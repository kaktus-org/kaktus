"""add income token to users

Revision ID: f6b348d5bc39
Revises: 7ef2452dff8e
Create Date: 2024-02-02 17:49:48.513446

"""
from typing import Sequence, Union

from alembic import op
from sqlalchemy import Column, String


# revision identifiers, used by Alembic.
revision: str = 'f6b348d5bc39'
down_revision: Union[str, None] = '7ef2452dff8e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", Column("income_token", String, unique=True, nullable=True))


def downgrade() -> None:
    op.drop_column("users", "income_token")
