import express from "express";
import cors from "cors";

import { routerApi } from "./routes";

import { PORT, CORS_ORIGIN } from "./config";

const app = express();

/* Middlewares */

app.use(express.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH"],
    optionsSuccessStatus: 200,
  }),
);

/* Routes */

routerApi(app);

/* Server */

app.listen(PORT, () =>
  console.log(
    `Running on port: ${PORT}\nEnvironment: ${process.env.NODE_ENV || "development"}`,
  ),
);
