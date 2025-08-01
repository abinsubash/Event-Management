import { adminRepositories } from "../repositories/admin.repositories"
import type { loginData } from "../types/login.types"

export const adminLogin = async (data: loginData) => {
  try {
    const response = await adminRepositories.login(data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    const errMsg = error?.response?.data?.error || "Something went wrong";
    const statusCode = error?.response?.status;
    console.log(errMsg);
    return { message: errMsg, status: statusCode };
  }
};

export const addCategoryes = async (data:string) =>{
  try{
    const response = await adminRepositories.addCategoryes(data)
    return response
  }catch(error:any){
    const errMsg = error?.response?.data?.error || "Something went wrong";
    const statusCode = error?.response?.status;
    console.log(errMsg);
    return { message: errMsg, status: statusCode };
  }
}

export const addAmenities = async (data: string) => {
  try {
    const response = await adminRepositories.addAmenities(data)
    return response
  } catch (error: any) {
    const errMsg = error?.response?.data?.error || "Something went wrong";
    const statusCode = error?.response?.status;
    return { message: errMsg, status: statusCode };
  }
};
