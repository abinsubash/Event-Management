import { Request, Response, NextFunction } from "express";
import { IUserAuthServices } from "../../../services/user/interface/IUser-auth.services";
import { IUserAuthController } from "../interface/IUser-auth.controller";
import { HttpStatus } from "../../../constants/status.constants";

export class UserAuthController implements IUserAuthController{
    constructor(private _userAuthServices:IUserAuthServices){}
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const user = await this._userAuthServices.signup(req.body)
            res.status(HttpStatus.OK).json({
                email:user
            });
        }catch(err){
            next(err)
        }
    }
    async otpVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
             await this._userAuthServices.otpVerification(req.body)
            res.status(HttpStatus.OK)
        }catch(error){
            
        }
    }
}