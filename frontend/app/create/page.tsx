"use client";
import { useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:8000";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleCreate = async () => {
    const validOptions = options.filter((opt) => opt.trim() !== "");
    if (!question.trim() || validOptions.length < 2) {
      alert("Please enter a question and at least two options.");
      return;
    }
    await axios.post(`${BACKEND_URL}/polls`, {
      question,
      options: validOptions,
    });
    setQuestion("");
    setOptions(["", ""]);
    alert("Poll created successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Create a Poll</h1>

      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 w-96 mb-3 rounded"
      />

      {options.map((opt, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          className="border p-2 w-96 mb-2 rounded"
        />
      ))}

      <button
        onClick={addOption}
        className="bg-green-500 text-white px-4 py-2 rounded mb-3 hover:bg-green-600 transition"
      >
        ➕ Add Option
      </button>

      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Create Poll
      </button>
    </div>
  );
}
