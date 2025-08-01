import { UserRole } from "./IUser";


export interface ILogin{
    email:string,
    password:string,
    role:UserRole
}