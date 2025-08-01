import axiosInstance from "../api/axios";
import type { loginData } from "../types/login.types";

export const adminRepositories={
    login:(data:loginData)=>axiosInstance.post('/admin/auth/login',data),
    addCategoryes: (data: string) => axiosInstance.post('/admin/addCategoryes', { name: data }),
    addAmenities:(data:string) =>axiosInstance.post('/admin/addAmenities',{name:data})
}