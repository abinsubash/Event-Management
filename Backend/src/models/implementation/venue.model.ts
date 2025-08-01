import { Schema, model, Document, Types } from "mongoose";
import { IVenue } from "../../types/IVenu";

export interface IVenueModel extends Document, Omit<IVenue, "_id"> {}

const venueSchema = new Schema<IVenueModel>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number,Number],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  amenities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Amenity",
      required: true,
    },
  ],
  specialFeatures: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerId: {
    type: Types.ObjectId,
  },
  CancellationPolicy: {
    type: String,
  },
  images: {
    type: [String],
    required: true, 
  },
  capacity: {
  type: Number,
  required: true,
}
});

venueSchema.index({ "location": "2dsphere" });

const Venue = model<IVenueModel>("Venue", venueSchema);

export default Venue;