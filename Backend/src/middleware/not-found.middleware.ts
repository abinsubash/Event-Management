import { NextFunction, Request, Response } from "express";
import { createHttpError } from "../utils/http-error.util";
import { HttpStatus } from "../constants/status.constants";
import { HttpResponce } from "../constants/response-message.constant";

export const notFoundHandler = (req:Request,res:Response,next:NextFunction)=>{
    next(createHttpError(HttpStatus.NO_CONFLICT,HttpResponce.PAGE_NOT_FOUND))
}