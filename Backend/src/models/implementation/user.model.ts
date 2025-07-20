import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../../types/IUser";
export interface IUserModel extends Document, Omit<IUser,"_id">{}

const userSchema = new Schema<IUserModel>({
    name:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = model<IUserModel>("User",userSchema)
export default User;