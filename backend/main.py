from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import uuid
import json

app = FastAPI(title="QuickPoll Backend")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

polls: Dict[str, dict] = {}
connections: List[WebSocket] = []


class PollCreate(BaseModel):
    question: str
    options: List[str]


class Comment(BaseModel):
    text: str


async def broadcast_update():
    message = json.dumps({"type": "refresh"})
    for connection in connections:
        try:
            await connection.send_text(message)
        except Exception:
            pass


@app.get("/")
def home():
    return {"message": "QuickPoll Backend Running Successfully 🚀"}


@app.post("/polls")
async def create_poll(poll: PollCreate):
    poll_id = str(uuid.uuid4())
    polls[poll_id] = {
        "id": poll_id,
        "question": poll.question,
        "options": poll.options,
        "votes": [0] * len(poll.options),
        "likes": 0,
        "comments": [],
    }
    await broadcast_update()
    return polls[poll_id]


@app.get("/polls")
def list_polls():
    return list(polls.values())


@app.post("/polls/{poll_id}/vote/{index}")
async def vote_poll(poll_id: str, index: int):
    if poll_id in polls and 0 <= index < len(polls[poll_id]["votes"]):
        polls[poll_id]["votes"][index] += 1
        await broadcast_update()
        return polls[poll_id]
    return {"error": "Invalid poll or option index"}


@app.post("/polls/{poll_id}/like")
async def like_poll(poll_id: str):
    if poll_id in polls:
        polls[poll_id]["likes"] += 1
        await broadcast_update()
        return polls[poll_id]
    return {"error": "Poll not found"}


@app.post("/polls/{poll_id}/comments")
async def add_comment(poll_id: str, comment: Comment):
    if poll_id in polls:
        polls[poll_id]["comments"].append(comment.text)
        await broadcast_update()
        return polls[poll_id]
    return {"error": "Poll not found"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        connections.remove(websocket)
