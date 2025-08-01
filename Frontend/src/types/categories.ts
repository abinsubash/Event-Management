export interface Category {
  _id: string;
  name: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}