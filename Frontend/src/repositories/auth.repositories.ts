import axiosInstance from "../api/axios"
import type { signupData } from "../types/signup.types"

export const authRepositories ={
    signupRepo:(data:signupData)=> axiosInstance.post('/auth/user/signup',data)    
}