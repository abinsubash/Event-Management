import { IOwnerServices } from "../interface/IOwner.services";
import { IOwnerRepositories } from "../../../repositories/owner/interface/IOwner.repositories";
import { ICategory } from "../../../types/ICategory";
import { IAmenity } from "../../../types/IAmenities";

export class OwnerServices implements IOwnerServices {
  constructor(private _ownerRepositories: IOwnerRepositories) {}

  async getAllCategories(): Promise<ICategory[]> {
    console.log('evende eatti 1')
    const categories = await this._ownerRepositories.getAllCategories();
     console.log(categories)
    if (!categories) {
      throw new Error("No categories found");
    }
    return categories;
  }
   async getAllAmenities(): Promise<IAmenity[]> {
    console.log('evende eatti 1')

     const amenities = await this._ownerRepositories.getAllAmenities();
     console.log(amenities)
    if (!amenities) {
      throw new Error("No amenities found");
    }
    return amenities;
  }
}