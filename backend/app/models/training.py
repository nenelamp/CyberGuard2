from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class TrainingProgress(BaseModel):
    user_id: str
    module_id: str
    module_title: str
    completion_status: str = Field(default="not_started")  # not_started, in_progress, completed
    score: Optional[float] = None
    max_score: Optional[float] = None
    completion_percentage: float = Field(default=0.0)
    time_spent_seconds: int = Field(default=0)
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    answers: Dict[str, Any] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TrainingProgressCreate(BaseModel):
    module_id: str
    module_title: str

class TrainingProgressUpdate(BaseModel):
    completion_status: Optional[str] = None
    score: Optional[float] = None
    max_score: Optional[float] = None
    completion_percentage: Optional[float] = None
    time_spent_seconds: Optional[int] = None
    answers: Optional[Dict[str, Any]] = None
    completed_at: Optional[datetime] = None

class TrainingProgressResponse(BaseModel):
    id: str
    user_id: str
    module_id: str
    module_title: str
    completion_status: str
    score: Optional[float]
    max_score: Optional[float]
    completion_percentage: float
    time_spent_seconds: int
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

class UserTrainingSummary(BaseModel):
    user_id: str
    total_modules: int
    completed_modules: int
    average_score: float
    total_time_spent_seconds: int
    last_activity: Optional[datetime]
    modules: List[TrainingProgressResponse]

class TrainingScore(BaseModel):
    user_id: str
    module_id: str
    module_title: str
    score: float
    max_score: float
    percentage: float
    answers: Dict[str, Any]
    submitted_at: datetime = Field(default_factory=datetime.utcnow)

class TrainingScoreCreate(BaseModel):
    module_id: str
    module_title: str
    score: float
    max_score: float
    answers: Dict[str, Any]

class TrainingScoreResponse(BaseModel):
    id: str
    user_id: str
    module_id: str
    module_title: str
    score: float
    max_score: float
    percentage: float
    answers: Dict[str, Any]
    submitted_at: datetime
