import Amenity, { IAmenityModel } from "../../../models/implementation/amenities.model";
import Category, { ICategoryModel } from "../../../models/implementation/category.model";
import { IAmenity } from "../../../types/IAmenities";
import { ICategory } from "../../../types/ICategory";
import { BaseRepository } from "../../bace.repository";
import { IOwnerRepositories } from "../interface/IOwner.repositories";

export class OwnerRepositories implements IOwnerRepositories {
  private categoryRepo: BaseRepository<ICategoryModel>;
  private amenityRepo: BaseRepository<IAmenityModel>;

  constructor() {
    this.categoryRepo = new (class extends BaseRepository<ICategoryModel> {})(Category);
    this.amenityRepo = new (class extends BaseRepository<IAmenityModel> {})(Amenity);
  }

  async getAllCategories(): Promise<ICategory[]> {
    const categories = await this.categoryRepo.findAll();
    return categories.map((cat) => ({
      _id: (cat._id as { toString(): string }).toString(),
      name: cat.name,
      status: cat.status,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));
  }

  async getAllAmenities(): Promise<IAmenity[]> {
    const amenities = await this.amenityRepo.findAll();
    return amenities.map((amen) => ({
      _id: (amen._id as { toString(): string }).toString(),
      name: amen.name,
      status: amen.status,
      createdAt: amen.createdAt,
      updatedAt: amen.updatedAt,
    }));
  }
}
