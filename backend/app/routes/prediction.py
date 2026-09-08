import io

from fastapi import APIRouter, File, UploadFile
from PIL import Image

from ml.src.inference import predict_image


router = APIRouter()


@router.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    image_bytes = await file.read()

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")

    result = predict_image(image)

    return {
        "filename": file.filename,
        **result,
    }