import { HttpStatus } from "../../../constants/status.constants";
import { IAdminServices } from "../../../services/admin/interface/IAdmin.services";
import { IAdminController } from "../interface/IAdmin.controller";
import { NextFunction, Request, Response } from "express";

export class AdminController implements IAdminController {
  constructor(private _adminServices: IAdminServices) {}
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { accessToken, refreshToken, admin } =
        await this._adminServices.login(req.body);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(HttpStatus.OK).json({ accessToken: accessToken, admin });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
   async addCategoryes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
      await this._adminServices.addCategoryes(req.body)
      res.status(HttpStatus.OK)
    }catch(error){
      next(error)
    }
  }
  async addAmenities(req: Request, res: Response, next: NextFunction): Promise<void> {
      try{
      await this._adminServices.addAmenities(req.body)
      res.status(HttpStatus.OK)
    }catch(error){
      next(error)
    }
  }
}
