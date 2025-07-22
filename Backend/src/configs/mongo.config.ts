import mongoose from "mongoose";
import { env } from "./env.config";

const MONGO_URI = env.MONGO_URI as string;

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDb connected ");
  } catch (error) {
    console.log("MongoDb Error", error);
  }
}