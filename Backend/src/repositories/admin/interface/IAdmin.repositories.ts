import { IAmenityModel } from "../../../models/implementation/amenities.model";
import { ICategoryModel } from "../../../models/implementation/category.model";
import { IAdmin } from "../../../types/IAdmin";
import { IAmenity } from "../../../types/IAmenities";
import { ICategory } from "../../../types/ICategory";

export interface IAdminRepositories {
  findByEmail(email: string): Promise<IAdmin>;
  findCategoryByName(name: string): Promise<ICategory | null>;
  createCategory(data: { name: string }): Promise<ICategoryModel>;
  findAmenitiesByName(name: string): Promise<IAmenity | null>;
  createAmenities(data: { name: string }): Promise<IAmenityModel>;
}
