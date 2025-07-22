import { authRepositories } from "../repositories/auth.repositories"
import type { signupData } from "../types/signup.types"

export const signupServices = async(data:signupData)=>{
    try{
        const responce = await authRepositories.signupRepo(data)
        return responce
    }catch(error){
        console.log(error)
    }
}
export const otpServices = async(otp:string,email:string)=>{
    try{

        const responce = await authRepositories.otpVerification(otp,email)
        return responce
    }catch(error){
        console.log(error)
    }
}