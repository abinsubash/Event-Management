import { IUserModel } from "../../../models/implementation/user.model";
import { ILogin } from "../../../types/ILogin";
import { IOtp } from "../../../types/IOtp";
import { IUser } from "../../../types/IUser";

export interface IUserServices{
    signup(user:IUser):Promise<any>;
    otpVerification(data:IOtp):Promise<IUserModel>
    resendOtp(data:IOtp):Promise<any>
    login(data:ILogin):Promise<any>
}