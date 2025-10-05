import React, { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (users.length === 0) return <p className="p-4">No users yet.</p>;

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-bold text-indigo-700">User List</h2>
      <ul className="space-y-1">
        {users.map((user) => (
          <li key={user.id} className="p-2 border rounded bg-gray-50">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <p><strong>Progress:</strong> {user.progress}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
