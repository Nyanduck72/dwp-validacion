import { Router } from "express";

import { getUserById, getUserByEmail, createUser } from "../db/user";

const router = Router();

// @ts-ignore
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) return res.status(400).json({ message: "Bad request" });

  const user = getUserById(id);

  if (!user) return res.status(404).json({ message: "Not found" });

  res.status(200).json({ user });
});

// @ts-ignore
router.post("/", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({ message: "Bad request" });

  if (getUserByEmail(email))
    return res.status(409).json({ message: "User already exists" });

  if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/) === null)
    return res.status(400).json({ message: "Invalid email" });

  if (username.length >= 30 || username.match(/^[a-zA-Z0-9_]+$/) === null)
    return res.status(400).json({ message: "Invalid username" });

  let passwordError = "";

  if (password.length < 8)
    passwordError = "Password must be at least 8 characters long";

  if (password.match(/[A-Z]/) === null)
    passwordError = "Password must contain at least one uppercase letter";

  if (password.match(/[0-9]/) === null)
    passwordError = "Password must contain at least one number";

  if (passwordError) return res.status(400).json({ message: passwordError });

  try {
    const id = createUser(email, username, password);

    res.status(201).json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
