import io
import shutil
import uuid

from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)

from PIL import Image as PILImage

from sqlalchemy.orm import Session

from backend.app.core.dependencies import (
    get_current_user,
)

from backend.app.db.database import get_db

from backend.app.db.models import (
    Image,
    Inspection,
    Prediction,
    Room,
    User,
)

from ml.src.inference import predict_image


router = APIRouter()


PROJECT_ROOT = Path(__file__).resolve().parents[3]

UPLOAD_DIR = PROJECT_ROOT / "uploads"


UPLOAD_DIR.mkdir(
    exist_ok=True
)


@router.post(
    "/rooms/{room_id}/images",
    status_code=status.HTTP_201_CREATED,
)
async def upload_image(
    room_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    # ---------------------------------------------------------
    # Verify room ownership
    # ---------------------------------------------------------

    room = (
        db.query(Room)
        .join(
            Inspection,
            Room.inspection_id ==
            Inspection.id,
        )
        .filter(
            Room.id == room_id,
            Inspection.user_id ==
            current_user.id,
        )
        .first()
    )


    if room is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found",
        )


    # ---------------------------------------------------------
    # Validate file type
    # ---------------------------------------------------------

    if (
        not file.content_type
        or not file.content_type.startswith("image/")
    ):

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be an image",
        )


    # ---------------------------------------------------------
    # Read image
    # ---------------------------------------------------------

    image_bytes = await file.read()


    try:

        image = PILImage.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

    except Exception:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image file",
        )


    # ---------------------------------------------------------
    # Generate unique filename
    # ---------------------------------------------------------

    original_filename = (
        file.filename or "image"
    )


    file_extension = Path(
        original_filename
    ).suffix.lower()


    if not file_extension:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image must have a file extension",
        )


    unique_filename = (
        f"{uuid.uuid4().hex}{file_extension}"
    )


    file_path = (
        UPLOAD_DIR /
        unique_filename
    )


    # ---------------------------------------------------------
    # Save physical file
    # ---------------------------------------------------------

    with file_path.open("wb") as buffer:

        shutil.copyfileobj(
            io.BytesIO(image_bytes),
            buffer,
        )


    image_url = (
        f"/uploads/{unique_filename}"
    )


    # ---------------------------------------------------------
    # Create Image record
    # ---------------------------------------------------------

    new_image = Image(
        room_id=room_id,
        file_path=image_url,
    )


    db.add(new_image)

    db.flush()


    # ---------------------------------------------------------
    # Run ML inference
    # ---------------------------------------------------------

    result = predict_image(
        image
    )


    # ---------------------------------------------------------
    # Create Prediction record
    # ---------------------------------------------------------

    new_prediction = Prediction(
        image_id=new_image.id,
        label=result["prediction"],
        confidence=result["confidence"],
        severity=result["severity"],
    )


    db.add(new_prediction)


    # ---------------------------------------------------------
    # Save database transaction
    # ---------------------------------------------------------

    db.commit()

    db.refresh(new_image)

    db.refresh(new_prediction)


    # ---------------------------------------------------------
    # Return response
    # ---------------------------------------------------------

    return {

        "image": {

            "id":
                new_image.id,

            "room_id":
                new_image.room_id,

            "file_path":
                new_image.file_path,

            "uploaded_at":
                new_image.uploaded_at,

        },

        "prediction": {

            "id":
                new_prediction.id,

            "label":
                new_prediction.label,

            "confidence":
                new_prediction.confidence,

            "severity":
                new_prediction.severity,

            "created_at":
                new_prediction.created_at,

        },

        "top_predictions":
            result["top_predictions"],

    }