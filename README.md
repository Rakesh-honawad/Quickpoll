# 🗳️ QuickPoll — Real-Time Polling App

A **real-time polling platform** built with **Next.js**, **FastAPI**, and **WebSockets**.  
Users can create polls, vote, like, and comment — and see updates instantly without refreshing!

🌐 **Live App:** [https://quickpoll-rakeshapp.vercel.app](https://quickpoll-rakeshapp.vercel.app)  
🧠 **Backend API:** [https://quickpoll-zdu3.onrender.com](https://quickpoll-zdu3.onrender.com)

---

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
