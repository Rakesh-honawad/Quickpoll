# 🗳️ QuickPoll — Real-Time Polling Platform

**QuickPoll** is an interactive, real-time opinion polling platform that allows users to:
- 📝 Create polls with multiple options  
- 🗳️ Vote instantly and see live updates  
- ❤️ Like polls to show engagement  
- 💬 Comment on polls to share opinions  
- ⚡ Experience live synchronization across all users via WebSockets  

This project demonstrates full-stack integration of **FastAPI (backend)** and **Next.js (frontend)** — built with performance, simplicity, and scalability in mind.

---

## 🌍 Live Demo

| Service | Link |
|----------|------|
| 🧠 **Frontend (Next.js)** | [https://quickpoll-rakeshapp.vercel.app](https://quickpoll-rakeshapp.vercel.app) |
| ⚙️ **Backend (FastAPI)** | [https://quickpoll-zdu3.onrender.com](https://quickpoll-zdu3.onrender.com) |

---

## ✨ Key Features

✅ **Create Polls** — Add a question and multiple options dynamically.  
✅ **Vote in Real-Time** — Votes update instantly without page reload.  
✅ **Like Polls** — Express your opinion with one click.  
✅ **Comments** — Users can discuss polls with threaded comments.  
✅ **WebSocket Integration** — Ensures seamless real-time updates across users.  
✅ **Responsive Design** — Works beautifully across mobile and desktop.  
✅ **Deployed on Cloud** —  
- Backend → [Render](https://render.com)  
- Frontend → [Vercel](https://vercel.com)

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | [Next.js 14 (App Router)](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/) |
| **Backend** | [FastAPI](https://fastapi.tiangolo.com/) |
| **Real-Time** | WebSockets |
| **Deployment** | Render (Backend) + Vercel (Frontend) |
| **Database** | In-memory (Demo) → Extendable to PostgreSQL / MongoDB |

---

> 💡 **Goal:**  
> QuickPoll is designed as a scalable template for live, event-driven web applications — combining simplicity, interactivity, and real-time communication.


## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | [Next.js 14 (App Router)](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/) |
| **Backend** | [FastAPI](https://fastapi.tiangolo.com/) |
| **Real-Time** | WebSockets (FastAPI `websockets` module) |
| **Database** | In-memory (for demo) — can be extended to PostgreSQL / MongoDB |
| **Deployment** | Frontend → [Vercel](https://vercel.com) <br> Backend → [Render](https://render.com) |

---

### 📁 PROJECT STRUCTURE
```bash
QuickPoll/
├── backend/
│ ├── main.py # FastAPI app with REST + WebSocket endpoints
│ ├── requirements.txt # Python dependencies
│ └── ...
├── frontend/
│ ├── app/
│ │ ├── page.tsx # Home (poll listing page)
│ │ ├── create/page.tsx # Poll creation page
│ │ └── ...
│ ├── components/ # UI components
│ ├── utils/ # API and helper logic
│ ├── .env.local # Backend API environment config
│ ├── package.json
│ └── ...
└── README.md
````
### SYSTEM DESIGN
![Uploading image.png…]()


---

## ⚙️ Local Setup

### 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/Rakesh-honawad/Quickpoll.git
cd Quickpoll
```
### 🧩 2. Backend Setup (FastAPI)
## Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```
## Run the Server
```bash
uvicorn main:app --reload
```

### 💻 3. Frontend Setup (Next.js)
## Install Dependencies
```bash
cd frontend
npm install
```

## Add Environment Variable

Create a file named .env.local inside the frontend directory and add:
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```
## Run the Frontend
```bash
npm run dev
```


### ➡️ App runs on http://localhost:3000

## ☁️ Deployment Guide

### 🧠 Backend Deployment (Render)

1. Push your backend code to GitHub.  
2. Visit [Render.com](https://render.com) → click **New → Web Service**.  
3. Connect your GitHub repo.  
4. Set the **Start Command:**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 10000
5. Click Deploy 🚀
Render will give you a backend URL like:
```bash
https://your-backend-name.onrender.com
```
### 🌐 Frontend Deployment (Vercel)

1. Visit Vercel.com
2. Import your QuickPoll GitHub repository.
3. In Environment Variables, add:
```bash
NEXT_PUBLIC_BACKEND_URL=https://your-backend-name.onrender.com
```
4. Click Deploy 🚀
Vercel will give you a frontend URL like:
```bash
https://your-frontend-name.vercel.app
```
