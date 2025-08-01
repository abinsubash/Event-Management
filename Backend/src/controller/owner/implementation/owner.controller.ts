import { IOwnerController } from "../interface/IOwner.controller";
import { IOwnerServices } from "../../../services/owner/interface/IOwner.services";
import { Request, Response, NextFunction } from "express";

export class OwnerController implements IOwnerController {
  constructor(private _ownerServices: IOwnerServices) {}

  async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
            console.log('controller got categories')
      const categories = await this._ownerServices.getAllCategories();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
   async getAllAmenities(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
      console.log('controller got amenities')
const amenities = await this._ownerServices.getAllAmenities();
      res.status(200).json(amenities);
    }catch(error){
      next(error)
    }
   }
}
