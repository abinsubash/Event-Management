import { ILogin } from "../../../types/ILogin";

export interface IAdminServices{
    login(data:ILogin):Promise<any>
    addCategoryes(data: { name: string }): Promise<void>;
    addAmenities(data:{name:string}):Promise<void>;
}