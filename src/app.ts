import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import errorMiddleware from "./middlewares/error.middleware";
import { apiLimiter } from "./middlewares/rateLimit.middleware";
import rootRouter from "./routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(apiLimiter);

app.use(
  morgan("combined", {
    skip: (_req, res) => res.statusCode < 400,
  })
);

app.get("/", (_req, res) => {
  res.send("Happy Whale");
});

app.use("/api/v1", rootRouter);

app.use(errorMiddleware);

export default app;
