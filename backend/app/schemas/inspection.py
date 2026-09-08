from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class InspectionCreate(BaseModel):
    property_name: str = Field(
        ...,
        min_length=1,
        max_length=200,
    )

    inspection_type: Literal[
        "move_in",
        "move_out",
    ]


class PredictionSummary(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    label: str
    confidence: float
    severity: str
    created_at: datetime


class ImageSummary(BaseModel):
    id: int
    image_url: str
    uploaded_at: datetime
    prediction: PredictionSummary | None = None


class RoomSummary(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    name: str
    images: list[ImageSummary]


class InspectionResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    user_id: int
    property_name: str
    inspection_type: str
    status: str


class InspectionDetailResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    user_id: int
    property_name: str
    inspection_type: str
    status: str
    created_at: datetime
    rooms: list[RoomSummary]