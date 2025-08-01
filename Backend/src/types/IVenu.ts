import { Types } from "mongoose";

export interface IVenue {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  location: {
    type: "Point";
    coordinates: [number, number];
    address: string;
  };
  category: [Types.ObjectId];
  amenities: [Types.ObjectId];
  specialFeatures:string;
  price:number,
  offerId?:Types.ObjectId,
  CancellationPolicy?:string
  images?:[string];
  capacity:Number
}
