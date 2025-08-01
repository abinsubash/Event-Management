// controller/owner/interface/owner.controller.ts

import { NextFunction, Request, Response } from "express";

export interface IOwnerController {
    getAllCategories(req:Request,res:Response,next:NextFunction):Promise<void>
}
