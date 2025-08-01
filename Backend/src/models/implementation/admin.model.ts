import { Document, Schema, model } from "mongoose";
import { IAdmin } from "../../types/IAdmin";

export interface IAdminModel extends Document, Omit<IAdmin, "_id"> {}

const adminSchema = new Schema<IAdminModel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const Admin = model<IAdminModel>("Admin", adminSchema);

export default Admin;
