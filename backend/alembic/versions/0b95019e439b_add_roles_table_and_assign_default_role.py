"""Add roles table and assign default role

Revision ID: 0b95019e439b
Revises: 7ef2452dff8e
Create Date: 2024-01-28 23:01:31.469144

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from sqlalchemy import Integer

# revision identifiers, used by Alembic.
revision: str = '0b95019e439b'
down_revision: Union[str, None] = '7ef2452dff8e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    roles_table = op.create_table(
        'roles',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False, unique=True)
    )

    op.bulk_insert(roles_table,
                   [{'name': 'Admin'}, {'name': 'User'}])

    op.create_table(
        'user_roles',
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
        sa.Column('role_id', sa.Integer, sa.ForeignKey('roles.id', ondelete='CASCADE'), primary_key=True)
    )

    conn = op.get_bind()
    admin_role_id = conn.execute(sa.select([roles_table.c.id]).where(roles_table.c.name == 'Admin')).fetchone()[0]

    users = conn.execute(sa.select([sa.table('users', column('id')).c.id])).fetchall()

    op.bulk_insert(table('user_roles',
                         column('user_id', Integer),
                         column('role_id', Integer)),
                   [{'user_id': user_id, 'role_id': admin_role_id} for user_id, in users])


def downgrade():
    op.drop_table('user_roles')
    op.drop_table('roles')
