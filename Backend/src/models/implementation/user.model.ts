import mongoose, { Document, model, Schema } from "mongoose";
import { IUser } from "../../types/IUser";
export interface IUserModel extends Document, Omit<IUser,"_id">{}

const userSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "owner", "employee"],
      required: true,
    },
    roles:{
        type:[String],
        enum:["user", "owner", "employee"],
    },
    profile_image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);


const User = model<IUserModel>("User",userSchema)
export default User;