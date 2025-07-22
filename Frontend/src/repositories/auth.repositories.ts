import axiosInstance from "../api/axios"
import type { signupData } from "../types/signup.types"

export const authRepositories ={
    signupRepo:(data:signupData)=> axiosInstance.post('/auth/user/signup',data),
    otpVerification:(otp:string,email:string) =>axiosInstance.post('/auth/user/otpVerification',{otp,email})
}