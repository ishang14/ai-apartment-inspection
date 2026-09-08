from pydantic import BaseModel, Field


class RoomCreate(BaseModel):
    inspection_id: int
    name: str = Field(
        ...,
        min_length=1,
        max_length=100,
    )


class RoomResponse(BaseModel):
    id: int
    inspection_id: int
    name: str