import { Request, Response, NextFunction } from "express";
import { IUserServices } from "../../../services/user/interface/IUser.services";
import { IUserController } from "../interface/IUser.controller";
import { HttpStatus } from "../../../constants/status.constants";

export class UserController implements IUserController {
  constructor(private _userServices: IUserServices) {}
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this._userServices.signup(req.body);
      res.status(HttpStatus.OK).json({
        email: user,
      });
    } catch (err) {
      console.log("next ",err)
      next(err);
    }
  }
  async otpVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this._userServices.otpVerification(req.body);
      res.status(HttpStatus.OK);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this._userServices.resendOtp(req.body);
      res.status(HttpStatus.OK);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { accessToken, refreshToken, user } =
        await this._userServices.login(req.body);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(HttpStatus.OK).json({ accessToken: accessToken, user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
