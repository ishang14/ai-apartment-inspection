"""add inspection ownership

Revision ID: 718a641d281c
Revises: 824a00655eaa
Create Date: 2026-09-07 17:21:18.315397

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "718a641d281c"
down_revision: Union[str, Sequence[str], None] = "824a00655eaa"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # ---------------------------------------------------------
    # 1. Add user_id temporarily as nullable
    # ---------------------------------------------------------

    op.add_column(
        "inspections",
        sa.Column(
            "user_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    # ---------------------------------------------------------
    # 2. Assign existing inspections to user ID 1
    # ---------------------------------------------------------

    op.execute(
        "UPDATE inspections "
        "SET user_id = 1 "
        "WHERE user_id IS NULL"
    )

    # ---------------------------------------------------------
    # 3. Add foreign key
    # ---------------------------------------------------------

    op.create_foreign_key(
        "fk_inspections_user_id_users",
        "inspections",
        "users",
        ["user_id"],
        ["id"],
    )

    # ---------------------------------------------------------
    # 4. Make user_id required
    # ---------------------------------------------------------

    op.alter_column(
        "inspections",
        "user_id",
        nullable=False,
    )

    # ---------------------------------------------------------
    # 5. Add index
    # ---------------------------------------------------------

    op.create_index(
        "ix_inspections_user_id",
        "inspections",
        ["user_id"],
        unique=False,
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_index(
        "ix_inspections_user_id",
        table_name="inspections",
    )

    op.drop_constraint(
        "fk_inspections_user_id_users",
        "inspections",
        type_="foreignkey",
    )

    op.drop_column(
        "inspections",
        "user_id",
    )