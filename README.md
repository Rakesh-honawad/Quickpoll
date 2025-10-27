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



---

## ⚙️ Local Setup

### 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/Rakesh-honawad/Quickpoll.git
cd Quickpoll
```
