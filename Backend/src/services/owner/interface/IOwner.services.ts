// services/owner/interface/owner.services.ts

import { IAmenity } from "../../../types/IAmenities";
import { ICategory } from "../../../types/ICategory";

export interface IOwnerServices {
      getAllCategories():Promise<ICategory[]>
      getAllAmenities():Promise<IAmenity[]>
}
