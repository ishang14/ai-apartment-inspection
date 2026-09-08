from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from backend.app.core.dependencies import (
    get_current_user,
)

from backend.app.db.database import get_db

from backend.app.db.models import (
    Inspection,
    Room,
    User,
)

from backend.app.schemas.room import (
    RoomCreate,
    RoomResponse,
)


router = APIRouter()


@router.post(
    "/rooms",
    response_model=RoomResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_room(
    room: RoomCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    inspection = (
        db.query(Inspection)
        .filter(
            Inspection.id ==
            room.inspection_id,
            Inspection.user_id ==
            current_user.id,
        )
        .first()
    )


    if inspection is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspection not found",
        )


    new_room = Room(
        inspection_id=room.inspection_id,
        name=room.name,
    )


    db.add(new_room)

    db.commit()

    db.refresh(new_room)


    return new_room