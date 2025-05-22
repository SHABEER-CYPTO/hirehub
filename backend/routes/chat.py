from datetime import datetime
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Set
from pydantic import BaseModel
from sqlalchemy import or_, and_
from database import get_db
from models import MessageModel

router = APIRouter()

# ----------------------------- #
# 📦 Pydantic Schemas
# ----------------------------- #
class MessageCreate(BaseModel):
    sender_id: int
    receiver_id: int
    content: str

class MessageResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    content: str
    timestamp: datetime

    class Config:
        from_attributes = True

# ----------------------------- #
# 🔌 WebSocket Connection Manager
# ----------------------------- #
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, Set[WebSocket]] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = set()
        self.active_connections[user_id].add(websocket)

    async def disconnect(self, user_id: int, websocket: WebSocket):
        if user_id in self.active_connections:
            self.active_connections[user_id].discard(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]

    async def send_to_user(self, user_id: int, message: str):
        if user_id in self.active_connections:
            for connection in self.active_connections[user_id]:
                await connection.send_text(message)

    async def broadcast_to_users(self, user_ids: List[int], message: str):
        for uid in user_ids:
            await self.send_to_user(uid, message)

manager = ConnectionManager()

# ----------------------------- #
# 📨 Send message (store in DB)
# ----------------------------- #
@router.post("/messages", response_model=MessageResponse)
def send_message(msg: MessageCreate, db: Session = Depends(get_db)):
    new_msg = MessageModel(
        sender_id=msg.sender_id,
        receiver_id=msg.receiver_id,
        content=msg.content,
        timestamp=datetime.utcnow()
    )
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)
    return new_msg

# ----------------------------- #
# 📄 Get chat history between two users
# ----------------------------- #
@router.get("/messages", response_model=List[MessageResponse])
def get_messages(user1: int, user2: int, db: Session = Depends(get_db)):
    return db.query(MessageModel).filter(
        or_(
            and_(MessageModel.sender_id == user1, MessageModel.receiver_id == user2),
            and_(MessageModel.sender_id == user2, MessageModel.receiver_id == user1)
        )
    ).order_by(MessageModel.timestamp.asc()).all()

# ----------------------------- #
# 🔴 WebSocket endpoint for real-time chat
# ----------------------------- #
@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            # Expected format:
            # {
            #   "sender_id": 1,
            #   "receiver_id": 2,
            #   "content": "Hello!"
            # }
            msg = MessageCreate(**data)

            # Save message to DB (optional: move to background task)
            db: Session = next(get_db())
            new_msg = MessageModel(
                sender_id=msg.sender_id,
                receiver_id=msg.receiver_id,
                content=msg.content,
                timestamp=datetime.utcnow()
            )
            db.add(new_msg)
            db.commit()
            db.refresh(new_msg)

            # Send to both sender and receiver if connected
            message_payload = {
                "id": new_msg.id,
                "sender_id": new_msg.sender_id,
                "receiver_id": new_msg.receiver_id,
                "content": new_msg.content,
                "timestamp": new_msg.timestamp.isoformat(),
            }
            await manager.broadcast_to_users(
                [msg.sender_id, msg.receiver_id],
                message=str(message_payload)
            )
    except WebSocketDisconnect:
        await manager.disconnect(user_id, websocket)
