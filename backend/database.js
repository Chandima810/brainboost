import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Initialize and open the SQLite database
export async function openDb() {
  return open({
    filename: "./data.db",
    driver: sqlite3.Database,
  });
}
