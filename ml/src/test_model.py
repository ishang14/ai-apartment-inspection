from model import load_model
import torch


MODEL_PATH = "../models/apartment_inspection_resnet18.pth"

device = "cuda" if torch.cuda.is_available() else "cpu"

model = load_model(
    MODEL_PATH,
    device=device
)

print("Model loaded successfully!")
print("Device:", device)
print("Model type:", type(model).__name__)