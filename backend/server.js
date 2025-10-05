import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { openDb } from "./database.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize database
(async () => {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    contact TEXT,
    progress TEXT
  )`);
})();

// Get all users
app.get("/api/users", async (req, res) => {
  const db = await openDb();
  const users = await db.all("SELECT * FROM users");
  res.json(users);
});

// Get single user
app.get("/api/users/:id", async (req, res) => {
  const db = await openDb();
  const user = await db.get("SELECT * FROM users WHERE id = ?", [req.params.id]);
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// Add new user
app.post("/api/users", async (req, res) => {
  const { name, contact, progress } = req.body;
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO users (name, contact, progress) VALUES (?, ?, ?)",
    [name, contact, progress]
  );
  res.json({ id: result.lastID, name, contact, progress });
});

// Update existing user
app.put("/api/users/:id", async (req, res) => {
  const { name, contact, progress } = req.body;
  const db = await openDb();
  await db.run(
    "UPDATE users SET name=?, contact=?, progress=? WHERE id=?",
    [name, contact, progress, req.params.id]
  );
  res.json({ message: "User updated" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
