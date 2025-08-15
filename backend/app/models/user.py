from datetime import datetime, timezone
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str
    organization: str
    created_at: datetime = datetime.now(timezone.utc)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    role: str
    organization: str
