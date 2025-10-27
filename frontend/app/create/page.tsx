"use client";
import { useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://quickpoll-zdu3.onrender.com";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  // Handle typing in an option
  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  // Add new option field
  const addOption = () => setOptions([...options, ""]);

  // Create poll via API
  const handleCreate = async () => {
    const validOptions = options.filter((opt) => opt.trim() !== "");
    if (!question.trim() || validOptions.length < 2) {
      alert("Please enter a question and at least two options.");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/polls`, {
        question,
        options: validOptions,
      });
      setQuestion("");
      setOptions(["", ""]);
      alert("✅ Poll created successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create poll. Try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          📝 Create a Poll
        </h1>

        {/* Question Input */}
        <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition"
        />

        {/* Option Inputs */}
        <div className="space-y-3 mb-4">
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition"
            />
          ))}
        </div>

        {/* Add Option Button */}
        <button
          onClick={addOption}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg mb-3 transition"
        >
          ➕ Add Option
        </button>

        {/* Create Poll Button */}
        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          🚀 Create Poll
        </button>
      </div>
    </main>
  );
}
