from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import UserCreate, UserLogin, UserOut
from app.database import db
from app.utils.security import hash_password, verify_password, create_access_token
from datetime import timedelta

router = APIRouter()

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
