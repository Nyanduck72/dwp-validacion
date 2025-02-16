import { db } from "./";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export function getUserById(id: number): User | undefined {
  return db.prepare('SELECT * FROM "user" WHERE id = ?').get(id) as User;
}

export function getUserByEmail(email: string): User | undefined {
  return db.prepare('SELECT * FROM "user" WHERE email = ?').get(email) as User;
}

export function createUser(email: string, username: string, password: string) {
  const newUser = db
    .prepare(
      'INSERT INTO "user" (email, username, password) VALUES (?, ?, ?) RETURNING id',
    )
    .get(email, username, password) as User;

  return newUser.id;
}
