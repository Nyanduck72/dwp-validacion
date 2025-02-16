import type { Express } from "express";

import user from "./user";

export const routerApi = (app: Express) => {
  app.use("/api/user", user);
};
