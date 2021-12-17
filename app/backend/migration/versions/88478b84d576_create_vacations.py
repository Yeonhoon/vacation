"""create vacations

Revision ID: 88478b84d576
Revises: 3abdcaa0ae19
Create Date: 2021-12-13 16:07:21.006779

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88478b84d576'
down_revision = '3abdcaa0ae19'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('vacations',
        sa.Column('vid', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('userid',sa.String(length=20)),
        sa.Column('vdate', sa.String, nullable=False),
        sa.Column('vtype', sa.String, nullable=False),
        sa.Column('vcheck', sa.Boolean, default=False),
        sa.Column('vhour', sa.String, nullable=False),
        sa.Column('boss', sa.String, nullable=False, default='정세영')
    )

    op.create_foreign_key(
        constraint_name = 'rid_fk',
        source_table='vacations',
        referent_table = 'users',
        local_cols=['userid'],
        remote_cols = ['rid']
    )


def downgrade():
    op.drop_table('vacations')