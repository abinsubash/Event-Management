import mongoose, { Schema, model, Document, Types } from "mongoose";
import { ICategory } from "../../types/ICategory";

export interface ICategoryModel extends Document,Omit<ICategory,"_id">{}

const categorySchema = new Schema<ICategoryModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Category = model<ICategoryModel>("Category", categorySchema);
export default Category;
