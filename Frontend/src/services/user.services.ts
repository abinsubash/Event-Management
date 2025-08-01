import { authRepositories } from "../repositories/user.repositories";
import type { loginData } from "../types/login.types";
import type { signupData } from "../types/signup.types";

export const signupServices = async (data: signupData) => {
  try {
    const response = await authRepositories.signupRepo(data);
    return { data: response.data, status: response.status }; 
  } catch (error: any) {
    const errMsg = error?.response?.data?.error || "Something went wrong";
    const statusCode = error?.response?.status;
    return { message: errMsg, status: statusCode };
  }
};

export const otpServices = async (otp: string, email: string) => {
  try {
    const response = await authRepositories.otpVerification(otp, email);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    const errMsg = error?.response?.data?.error || "Something went wrong";
    const statusCode = error?.response?.status;
    return { message: errMsg, status: statusCode };
  }
};

export const resendOtp = async (email: string) => {
  try {
    const responce = await authRepositories.resendOtp(email);
    return responce;
  } catch (err) {
    console.log(err);
  };
};

export const login = async (data: loginData) => {
  try {
    const response = await authRepositories.loginReq(data);
    console.log(response)
    return { data: response.data, status: response.status };
  } catch (error: any) {
    const errMsg = error?.response?.data?.error || "Something went wrong";
    console.log(errMsg)
    const statusCode = error?.response?.status;
    return { message: errMsg, status: statusCode };
  }
};


