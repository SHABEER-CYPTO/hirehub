from fastapi import APIRouter, Depends, Query, HTTPException, Path
from sqlalchemy.orm import Session
from typing import List, Optional, Literal
from database import get_db
from models import JobModel
from pydantic import BaseModel

router = APIRouter()

# Pydantic schema for creating a job
class JobCreate(BaseModel):
    title: str
    description: str
    salary: int
    experience: int
    location: str
    type: Literal["full-time", "part-time", "internship", "contract", "remote"]
    employer_id: int
    skills: List[str]

# Pydantic schema for updating a job
class JobUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    salary: Optional[int]
    experience: Optional[int]
    location: Optional[str]
    type: Optional[Literal["full-time", "part-time", "internship", "contract", "remote"]]
    skills: Optional[List[str]]

# Pydantic schema for response
class JobResponse(BaseModel):
    id: int
    title: str
    description: str
    salary: int
    experience: int
    location: str
    type: str
    employer_id: int
    skills: List[str]  # ✅ Include skills

    class Config:
        from_attributes = True

# ✅ GET /api/jobs?employer_id=123
@router.get("/jobs", response_model=List[JobResponse])
def get_jobs(employer_id: Optional[int] = Query(None), db: Session = Depends(get_db)):
    query = db.query(JobModel)
    if employer_id:
        query = query.filter(JobModel.employer_id == employer_id)
    return query.all()

# ✅ POST /api/jobs
@router.post("/jobs", response_model=JobResponse)
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    db_job = JobModel(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

# ✅ PUT /api/jobs/{job_id}
@router.put("/jobs/{job_id}", response_model=JobResponse)
def update_job(job_id: int, job: JobUpdate, db: Session = Depends(get_db)):
    db_job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")

    for key, value in job.dict(exclude_unset=True).items():
        setattr(db_job, key, value)

    db.commit()
    db.refresh(db_job)
    return db_job

# ✅ DELETE /api/jobs/{job_id}
@router.delete("/jobs/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
    return {"detail": "Job deleted"}
