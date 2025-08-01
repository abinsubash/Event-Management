import { Types } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}