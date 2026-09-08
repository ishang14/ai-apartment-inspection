from datetime import datetime

from pydantic import BaseModel


class ImageResponse(BaseModel):
    id: int
    room_id: int
    file_path: str
    uploaded_at: datetime