import Admin, { IAdminModel } from "../../../models/implementation/admin.model";
import Amenity, { IAmenityModel } from "../../../models/implementation/amenities.model";
import Category, { ICategoryModel } from "../../../models/implementation/category.model";
import { IAdmin } from "../../../types/IAdmin";
import { IAmenity } from "../../../types/IAmenities";
import { ICategory } from "../../../types/ICategory";
import { BaseRepository } from "../../bace.repository";
import { IAdminRepositories } from "../interface/IAdmin.repositories";

export class AdminRepositories extends BaseRepository<IAdminModel> implements IAdminRepositories{
constructor(){
    super(Admin)
}
async findByEmail(email: string): Promise<IAdmin> {
    return await this.findByEmail(email)
}
  async findCategoryByName(name: string): Promise<ICategory | null> {
    return Category.findOne({ name });
  }

async createCategory(data: { name: string }): Promise<ICategoryModel> {
  return Category.create(data);
}
    async findAmenitiesByName(name: string): Promise<IAmenity | null> {
    return Amenity.findOne({ name });
  }
    async createAmenities(data: { name: string; }): Promise<IAmenityModel> {
       return Amenity.create(data)
  }
}