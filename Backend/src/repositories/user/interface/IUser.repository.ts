import { IUserModel } from "../../../models/implementation/user.model";

export interface IUserRepository{
    findByEmail(email:string):Promise<IUserModel | null>
    findByNumber(phone_number:number):Promise<IUserModel | null>
    findOtp(email:string):Promise<any>
    findOtpUserdata(email:string):Promise<any>
}