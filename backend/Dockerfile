FROM python:3.13-slim


WORKDIR /app


# System dependencies

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libglib2.0-0 \
        libsm6 \
        libxext6 \
        libxrender1 \
    && rm -rf /var/lib/apt/lists/*


# Install Python dependencies

COPY backend/requirements.txt ./requirements.txt

# Install CPU-only PyTorch first. The default wheels bundle CUDA (~2.5GB),
# which makes the image huge and the build slow / prone to timing out.
RUN pip install --no-cache-dir \
        --index-url https://download.pytorch.org/whl/cpu \
        torch torchvision \
    && pip install --no-cache-dir -r requirements.txt


# Copy application code

COPY backend ./backend
COPY ml ./ml
COPY alembic.ini ./alembic.ini


# Create upload directory

RUN mkdir -p /app/uploads


# Start FastAPI

CMD ["sh", "-c", "alembic upgrade head && uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]