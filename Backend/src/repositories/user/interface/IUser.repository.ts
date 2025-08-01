import { IUserModel } from "../../../models/implementation/user.model";
import { IUser } from "../../../types/IUser";

export interface IUserRepository{
    findByEmail(email:string):Promise<IUser | null>
    findByNumber(phone_number:number):Promise<IUserModel | null>
    findOtp(email:string):Promise<any>
    findOtpUserdata(email:string):Promise<any>
    createUser(user:IUserModel):Promise<IUserModel>
    findByIdAndUpdate(userId: string, update: Partial<IUserModel>): Promise<IUserModel | null>;
}