"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// ✅ Use deployed backend URL (Render)
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://quickpoll-zdu3.onrender.com";

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
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});

  // Fetch all polls
  const fetchPolls = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/polls`);
      setPolls(res.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  // ✅ WebSocket + fallback polling
  useEffect(() => {
    fetchPolls();

    const wsUrl =
      (BACKEND_URL.endsWith("/")
        ? BACKEND_URL.slice(0, -1)
        : BACKEND_URL
      ).replace("https://", "wss://")
        .replace("http://", "ws://") + "/ws";

    console.log("🌐 Connecting to WebSocket:", wsUrl);

    let socket: WebSocket | null = null;

    try {
      socket = new WebSocket(wsUrl);

      socket.onopen = () => console.log("✅ WebSocket connected");
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "refresh") fetchPolls();
      };
      socket.onerror = () => {
        console.warn("⚠️ WebSocket connection failed, enabling fallback polling...");
        setInterval(fetchPolls, 10000);
      };
      socket.onclose = () => console.log("❌ WebSocket disconnected");
    } catch (error) {
      console.error("Error initializing WebSocket:", error);
      setInterval(fetchPolls, 10000);
    }

    return () => socket?.close();
  }, []);

  // Vote
  const handleVote = async (pollId: string, index: number) => {
    await axios.post(`${BACKEND_URL}/polls/${pollId}/vote/${index}`);
  };

  // Like
  const handleLike = async (pollId: string) => {
    await axios.post(`${BACKEND_URL}/polls/${pollId}/like`);
  };

  // Comment
  const handleComment = async (pollId: string) => {
    if (!newComment[pollId]?.trim()) return;
    await axios.post(`${BACKEND_URL}/polls/${pollId}/comments`, {
      text: newComment[pollId],
    });
    setNewComment((prev) => ({ ...prev, [pollId]: "" }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
        🗳️ QuickPoll — Real-Time Polling Platform
      </h1>

      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {polls.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No polls yet. Create one!
          </p>
        )}

        {polls.map((poll) => (
          <div
            key={poll.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100 dark:border-gray-700 transition-all"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 break-words">
              {poll.question}
            </h2>

            {/* Options */}
            <div className="space-y-2 mb-4">
              {poll.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleVote(poll.id, index)}
                  className="w-full flex flex-wrap justify-between items-center text-left bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-800 px-3 sm:px-4 py-2 rounded-lg transition"
                >
                  <span className="truncate">{option}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {poll.votes[index]} votes
                  </span>
                </button>
              ))}
            </div>

            {/* Like button */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button
                onClick={() => handleLike(poll.id)}
                className="px-4 py-2 bg-pink-100 dark:bg-pink-900 hover:bg-pink-200 dark:hover:bg-pink-800 text-pink-600 dark:text-pink-300 rounded-lg transition"
              >
                ❤️ {poll.likes}
              </button>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Comments 💬
              </h3>

              <div className="space-y-2 mb-3">
                {poll.comments.map((comment, i) => (
                  <p
                    key={i}
                    className="text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg break-words"
                  >
                    {comment}
                  </p>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
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
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                />
                <button
                  onClick={() => handleComment(poll.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
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
