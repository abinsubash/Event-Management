import { ownerRepositories } from "../repositories/owner.repositories";
import type { Amenities } from "../types/amenities";
import type { Category } from "../types/categories";

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await ownerRepositories.getAllCategories();
    return response.data
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    return []; 
  }
};

export const getAllAmenities = async (): Promise<Amenities[]> => {
  try {
    const response = await ownerRepositories.getAllAmenities();
    return response.data
  } catch (error) {
    console.error("Error in getAllAmenities:", error);
    return [];
  }
};
