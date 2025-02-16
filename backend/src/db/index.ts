import path from "path";
import Database from "better-sqlite3";

const DB_PATH = path.join(__dirname, "./dwp.db");

const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");

export { db };
