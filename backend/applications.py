from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query, Path
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from database import get_db
from models import ApplicationModel, JobModel, UserModel
from pydantic import BaseModel
import os
import shutil

router = APIRouter()
UPLOAD_DIR = "uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Schemas for output
class JobBrief(BaseModel):
    id: int
    title: str
    class Config:
        from_attributes = True

class ApplicantBrief(BaseModel):
    id: int
    name: str
    email: str
    class Config:
        from_attributes = True

class ApplicationOut(BaseModel):
    id: int
    job_id: int
    jobseeker_id: int
    cover_letter: str
    resume_path: str
    status: str
    job: Optional[JobBrief]
    jobseeker: Optional[ApplicantBrief]
    class Config:
        from_attributes = True

# Submit application
@router.post("/applications")
async def submit_application(
    job_id: int = Form(...),
    jobseeker_id: int = Form(...),
    cover_letter: str = Form(""),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        filename = f"{jobseeker_id}_{job_id}_{resume.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        new_app = ApplicationModel(
            job_id=job_id,
            jobseeker_id=jobseeker_id,
            cover_letter=cover_letter,
            resume_path=file_path,
            status="Pending"
        )
        db.add(new_app)
        db.commit()
        db.refresh(new_app)

        return {"success": True, "message": "Application submitted successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get applications (filtered by jobseeker or employer)
@router.get("/applications", response_model=List[ApplicationOut])
def get_applications(
    jobseeker_id: Optional[int] = Query(None),
    employer_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(ApplicationModel).options(
        joinedload(ApplicationModel.job),
        joinedload(ApplicationModel.jobseeker)
    )
    if jobseeker_id:
        query = query.filter(ApplicationModel.jobseeker_id == jobseeker_id)
    if employer_id:
        query = query.join(ApplicationModel.job).filter(JobModel.employer_id == employer_id)
    return query.all()

# Update application status
@router.put("/applications/{application_id}/status")
def update_application_status(
    application_id: int,
    new_status: str = Form(...),
    db: Session = Depends(get_db)
):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.status = new_status
    db.commit()
    return {"success": True, "message": "Application status updated", "status": app.status}
