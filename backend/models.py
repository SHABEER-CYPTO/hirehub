from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from database import Base
from datetime import datetime

class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    role = Column(String(20))  # 'jobseeker' or 'employer'

class JobModel(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(String(1000))
    salary = Column(Integer)
    experience = Column(Integer)
    location = Column(String(255))
    type = Column(String(50))
    employer_id = Column(Integer)

class ApplicationModel(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    jobseeker_id = Column(Integer, ForeignKey("users.id"))
    cover_letter = Column(String(2000))
    resume_path = Column(String(500))
    status = Column(String(20), default="Pending")

class MessageModel(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"))
    receiver_id = Column(Integer, ForeignKey("users.id"))
    content = Column(String(1000))
    timestamp = Column(DateTime, default=datetime.utcnow)
