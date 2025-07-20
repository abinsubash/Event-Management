import { authRepositories } from "../repositories/auth.repositories"
import type { signupData } from "../types/signup.types"

export const signupServices = async(data:signupData)=>{
    try{
        console.log("singupServices")
        const responce = await authRepositories.signupRepo(data)
        return responce
    }catch(error){
        console.log(error)
    }
}