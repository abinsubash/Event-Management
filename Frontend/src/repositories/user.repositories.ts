import axiosInstance from "../api/axios"
import type { loginData } from "../types/login.types"
import type { signupData } from "../types/signup.types"

export const authRepositories ={
    signupRepo:(data:signupData)=> axiosInstance.post('/user/auth/signup',data),
    otpVerification:(otp:string,email:string) =>axiosInstance.post('/user/auth/otpVerification',{otp,email}),
    resendOtp:(email:string)=>axiosInstance.post('/user/auth/resendOtp',{email}),
    loginReq:(data:loginData)=>axiosInstance.post('/user/auth/login',data),
}