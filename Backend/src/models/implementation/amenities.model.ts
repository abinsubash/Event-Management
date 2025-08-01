import { Schema, model, Document } from "mongoose";
import { IAmenity } from "../../types/IAmenities";

export interface IAmenityModel extends Document, Omit<IAmenity, "_id"> {}

const amenitySchema = new Schema<IAmenityModel>(
  {
    name: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Amenity = model<IAmenityModel>("Amenity", amenitySchema);
export default Amenity;
