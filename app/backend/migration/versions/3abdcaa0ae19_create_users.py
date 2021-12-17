"""create users

Revision ID: 3abdcaa0ae19
Revises: 
Create Date: 2021-12-13 16:04:09.693098

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3abdcaa0ae19'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
        sa.Column('rid', sa.String(length=20), nullable=False, index=True),
        sa.Column('name', sa.String(length=20), nullable=False),
        sa.Column('email',sa.String(length=30), nullable=False),
        sa.Column('nov',sa.Numeric, default=15),
        sa.Column('pw',sa.String(length=300), nullable=False),
        sa.PrimaryKeyConstraint('rid')
    )


def downgrade():
    op.drop_table('users')
