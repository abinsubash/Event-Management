import { NextFunction, Request, Response } from "express";

export interface IUserAuthController {
    signup(req:Request,res:Response,next:NextFunction):Promise<void>
    otpVerification(req:Request,res:Response,next:NextFunction):Promise<void>
}