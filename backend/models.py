from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.dialects.mysql import JSON

# ✅ User Table
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    role = Column(String(20))  # 'jobseeker' or 'employer'

    phone = Column(String(20), nullable=True)
    job_preference = Column(String(100), nullable=True)
    resume_path = Column(String(255), nullable=True)
    profile_picture = Column(String(255), nullable=True)

    # Relationships
    applications = relationship("ApplicationModel", back_populates="jobseeker", cascade="all, delete")
    jobs_posted = relationship("JobModel", back_populates="employer", cascade="all, delete")

    # Optional: messages support
    sent_messages = relationship("MessageModel", foreign_keys="[MessageModel.sender_id]", back_populates="sender")
    received_messages = relationship("MessageModel", foreign_keys="[MessageModel.receiver_id]", back_populates="receiver")


# ✅ Job Table
class JobModel(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(String(1000))
    salary = Column(Integer)
    experience = Column(Integer)
    location = Column(String(255))
    type = Column(String(50))
    employer_id = Column(Integer, ForeignKey("users.id"))
    skills = Column(JSON)  # ✅ Must be list format

    # Relationships
    employer = relationship("UserModel", back_populates="jobs_posted")
    applications = relationship("ApplicationModel", back_populates="job", cascade="all, delete")


# ✅ Application Table
class ApplicationModel(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    jobseeker_id = Column(Integer, ForeignKey("users.id"))
    cover_letter = Column(Text)
    resume_path = Column(String(500))
    status = Column(String(20), default="Pending")

    # Relationships
    job = relationship("JobModel", back_populates="applications")
    jobseeker = relationship("UserModel", back_populates="applications")


# ✅ Optional Message Table
class MessageModel(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"))
    receiver_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text)
    timestamp = Column(String(50))

    # Relationships
    sender = relationship("UserModel", foreign_keys=[sender_id], back_populates="sent_messages")
    receiver = relationship("UserModel", foreign_keys=[receiver_id], back_populates="received_messages")

class SavedJobModel(Base):
    __tablename__ = "saved_jobs"
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    job = relationship("JobModel")
