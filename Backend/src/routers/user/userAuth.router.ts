import { Request, Response, Router } from "express";

const userAuth_router = Router()

userAuth_router.post('/signup',(req:Request,res:Response)=>{
  console.log(req.body)
  res.status(200).json({ message: "Signup received" });
})

export default userAuth_router