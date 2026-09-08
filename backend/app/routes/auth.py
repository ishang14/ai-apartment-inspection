from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from backend.app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)

from backend.app.db.database import get_db
from backend.app.db.models import User

from backend.app.schemas.auth import (
    TokenResponse,
    UserCreate,
    UserResponse,
)


router = APIRouter()


@router.post(
    "/auth/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):

    existing_user = (
        db.query(User)
        .filter(
            User.email == user.email
        )
        .first()
    )


    if existing_user is not None:

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered",
        )


    new_user = User(
        email=user.email,
        password_hash=hash_password(
            user.password
        ),
    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    return new_user


@router.post(
    "/auth/login",
    response_model=TokenResponse,
)
def login(
    user: UserCreate,
    db: Session = Depends(get_db),
):

    existing_user = (
        db.query(User)
        .filter(
            User.email == user.email
        )
        .first()
    )


    if existing_user is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )


    password_valid = verify_password(
        user.password,
        existing_user.password_hash,
    )


    if not password_valid:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )


    access_token = create_access_token(
        existing_user.id
    )


    return {
        "access_token": access_token,
        "token_type": "bearer",
    }