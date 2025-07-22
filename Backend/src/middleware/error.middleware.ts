import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/status.constants";
import { HttpResponce } from "../constants/response-message.constant";
import { HttpError } from "../utils/http-error.util";

export const errorHandler = (
    err:HttpError | Error,
    req:Request,
    res:Response,
    next:NextFunction
)=>{
let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
let message:string = HttpResponce.SERVER_ERROR
if(err instanceof HttpError){
    statusCode = err.statusCode;
    message= err.message
}else{
    console.log('Unhandle',err)
}
res.status(statusCode).json({error:message})
}