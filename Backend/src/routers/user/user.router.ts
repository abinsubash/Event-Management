import { Request, Response, Router } from "express";
import { UserRepository } from "../../repositories/user/implementation/user.repository";
import {UserServices} from '../../services/user/implementation/user.services'
import { UserController } from "../../controller/user/implementation/user.controller";
import validate from "../../middleware/validate.middleware";
import signupSchema from "../../schema/signup.schema";
import loginSchema from "../../schema/login.schema";

const user_router = Router()
const userRepository  = new UserRepository()
const userService = new UserServices(userRepository)
const userController = new UserController(userService)
user_router.post('/auth/signup',validate(signupSchema),userController.signup.bind(userController))
user_router.post('/auth/otpVerification',userController.otpVerification.bind(userController))
user_router.post('/auth/resendOtp',userController.resendOtp.bind(userController))
user_router.post('/auth/login',validate(loginSchema),userController.login.bind(userController))
export default user_router