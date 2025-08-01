import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { HttpStatus} from "../constants/status.constants";
import { HttpResponse } from "../constants/response-message.constant";
import FormatZodErrors from "../utils/format-zod-error.util";


const validate = (Schema:ZodSchema)=>(req:Request,res:Response,next:NextFunction)=>{
    try{
        Schema.parse(req.body);
        next();
    }catch(error){
        if(error instanceof ZodError){
            console.log(error)
            res.status(HttpStatus.BAD_REQUEST).json({
                error:HttpResponse.INVALID_CREDENTIALS,
                details:FormatZodErrors(error)
            })
        }
    }
}

export default validate