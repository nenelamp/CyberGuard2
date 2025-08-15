from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_router, training_router
import os
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000",   # React or frontend dev
    "http://127.0.0.1:3000",
    "http://localhost:5173",   # Vite frontend
    "http://127.0.0.1:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(training_router, prefix="/api/training", tags=["Training"])

@app.get("/")
async def root():
    return {"message": "Welcome to SecureMind API"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=False)