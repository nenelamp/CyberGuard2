from fastapi import APIRouter, Depends, HTTPException, status, Header
from app.models.user import UserCreate, UserLogin, UserOut, UserProfile
from app.database import db
from app.utils.security import hash_password, verify_password, create_access_token, decode_token
from datetime import timedelta
from typing import Optional

router = APIRouter()

async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = authorization.replace("Bearer ", "")
    try:
        email = decode_token(token)
        user = await db.users.find_one({"email": email})
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(user.password)
    await db.users.insert_one({
        "email": user.email,
        "password": hashed_pw,
        "full_name": user.full_name,
        "organization": user.organization,
        "role": user.role
    })
    return {"email": user.email}


@router.post("/login")
async def login(user: UserLogin):
    record = await db.users.find_one({"email": user.email})
    if not record or not verify_password(user.password, record["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserProfile)
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "organization": current_user["organization"],
        "role": current_user["role"]
    }
