import axiosInstance from "../api/axios";

export const ownerRepositories = {
    getAllCategories:()=>axiosInstance.get('/owner/getAllCategories'),
    getAllAmenities:()=>axiosInstance.get('/owner/getAllAmenities')
}