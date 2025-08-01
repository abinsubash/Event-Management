export interface Amenities {
  _id: string;
  name: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}