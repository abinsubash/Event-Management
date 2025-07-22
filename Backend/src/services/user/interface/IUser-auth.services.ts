import { IOtp } from "../../../types/IOtp";
import { IUser } from "../../../types/IUser";

export interface IUserAuthServices{
    signup(user:IUser):Promise<any>;
    otpVerification(data:IOtp):Promise<any>
}