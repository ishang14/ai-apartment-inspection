import torch
import torch.nn as nn
from torchvision import models


NUM_CLASSES = 7

CLASS_NAMES = [
    "algae",
    "major_crack",
    "minor_crack",
    "peeling",
    "plain",
    "spalling",
    "stain",
]


def load_model(model_path, device="cpu"):
    model = models.resnet18(
        weights=None
    )

    model.fc = nn.Linear(
        model.fc.in_features,
        NUM_CLASSES
    )

    model.load_state_dict(
        torch.load(
            model_path,
            map_location=device
        )
    )

    model = model.to(device)
    model.eval()

    return model