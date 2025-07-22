import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import { env } from "./configs/env.config";
import userAuth_router from "./routers/user/userAuth.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { connectDB } from "./configs/mongo.config";
import { connectRedis } from "./configs/redis.config";

connectDB();
connectRedis()
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "OPTIONS"],
  })
);

app.use("/auth/user", userAuth_router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000`);
});
