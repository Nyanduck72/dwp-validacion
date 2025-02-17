import { User } from "../types";

const SERVER: string = "localhost:3000/api";

export const getUserById = (id: number) => {
  return fetch(`http://${SERVER}/user/${id}`)
    .then((res) => {
      if (res.status === 404) {
        throw new Error("404");
      }
      return res.json();
    })
    .then((data) => data.user);
};

export const createUser = (user: User) => {
  const { email, username, password } = user;
  return fetch(`http://${SERVER}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return res.json();
    })
    .then((data) => data.id);
};