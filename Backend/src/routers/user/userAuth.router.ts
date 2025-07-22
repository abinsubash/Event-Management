import { Request, Response, Router } from "express";
import { UserRepository } from "../../repositories/user/implementation/user.repository";
import {UserAuthServices} from '../../services/user/implementation/user-auth.services'
import { UserAuthController } from "../../controller/user/implementation/user-auth.controller";
import validate from "../../middleware/validate.middleware";
import signupSchema from "../../schema/signup.schema";
const userAuth_router = Router()
const userRepository  = new UserRepository()
const userAuthService = new UserAuthServices(userRepository)
const userAuthController = new UserAuthController(userAuthService)
userAuth_router.post('/signup',validate(signupSchema),userAuthController.signup.bind(userAuthController))
userAuth_router.post('/otpVerification',userAuthController.otpVerification.bind(userAuthController))
export default userAuth_router