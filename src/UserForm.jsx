import React, { useState } from "react";

export default function UserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [progress, setProgress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, progress }),
      });

      const data = await response.json();
      console.log("User added:", data);

      // Reset form
      setName("");
      setContact("");
      setProgress("");

      // Notify parent to refresh user list
      onUserAdded();
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold text-indigo-700">Add New User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Creativity Progress"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Add User
      </button>
    </form>
  );
}
