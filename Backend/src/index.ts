import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { env } from "./configs/env.config";
import userAuth_router from "./routers/user/userAuth.router";
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("frontend",env.FRONTEND_URL)
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'OPTIONS'],
  })
);
app.use('/auth/user', userAuth_router)

app.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000`);
});
