import { IAmenity } from "../../../types/IAmenities";
import { ICategory } from "../../../types/ICategory";

export interface IOwnerRepositories {
  getAllCategories(): Promise<ICategory[]>;
  getAllAmenities():Promise<IAmenity[]>
}