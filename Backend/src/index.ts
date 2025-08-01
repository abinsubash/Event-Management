import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import { env } from "./configs/env.config";
import user_router from "./routers/user/user.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { connectDB } from "./configs/mongo.config";
import { connectRedis } from "./configs/redis.config";
import admin_route from "./routers/admin/admin.route";
import owner_route from "./routers/owner/owner.route";

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

app.use("/user", user_router);
app.use("/admin",admin_route)
app.use("/owner",owner_route)

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000`);
});
