"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:8000";

interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: number[];
  likes: number;
  comments: string[];
}

export default function Home() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchPolls();
    const socket = new WebSocket("ws://localhost:8000/ws");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "refresh") fetchPolls();
    };
    setWs(socket);
    return () => socket.close();
  }, []);

  const fetchPolls = async () => {
    const res = await axios.get(`${BACKEND_URL}/polls`);
    setPolls(res.data);
  };

  const handleVote = async (pollId: string, index: number) => {
    await axios.post(`${BACKEND_URL}/polls/${pollId}/vote/${index}`);
  };

  const handleLike = async (pollId: string) => {
    await axios.post(`${BACKEND_URL}/polls/${pollId}/like`);
  };

  const handleComment = async (pollId: string) => {
    if (!newComment[pollId]?.trim()) return;
    await axios.post(`${BACKEND_URL}/polls/${pollId}/comments`, {
      text: newComment[pollId],
    });
    setNewComment((prev) => ({ ...prev, [pollId]: "" }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🗳️ QuickPoll — Real-Time Polling Platform
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {polls.length === 0 && (
          <p className="text-center text-gray-500">No polls yet. Create one!</p>
        )}

        {polls.map((poll) => (
          <div
            key={poll.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {poll.question}
            </h2>

            <div className="space-y-2 mb-4">
              {poll.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleVote(poll.id, index)}
                  className="w-full text-left bg-gray-100 hover:bg-blue-100 px-4 py-2 rounded-lg transition flex justify-between"
                >
                  <span>{option}</span>
                  <span className="text-sm text-gray-500">
                    {poll.votes[index]} votes
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => handleLike(poll.id)}
                className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-lg"
              >
                ❤️ {poll.likes}
              </button>
            </div>

            {/* Comment Section */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Comments 💬
              </h3>
              <div className="space-y-2 mb-3">
                {poll.comments.map((comment, i) => (
                  <p key={i} className="text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                    {comment}
                  </p>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment[poll.id] || ""}
                  onChange={(e) =>
                    setNewComment((prev) => ({
                      ...prev,
                      [poll.id]: e.target.value,
                    }))
                  }
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  onClick={() => handleComment(poll.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
