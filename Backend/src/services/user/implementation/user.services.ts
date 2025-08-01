import { redisClient } from "../../../configs/redis.config";
import { HttpResponse } from "../../../constants/response-message.constant";
import { HttpStatus } from "../../../constants/status.constants";
import { IUserModel } from "../../../models/implementation/user.model";
import { IUserRepository } from "../../../repositories/user/interface/IUser.repository";
import { ILogin } from "../../../types/ILogin";
import { IOtp } from "../../../types/IOtp";
import { IUser } from "../../../types/IUser";
import { comparePassword, hashPassword } from "../../../utils/bcrypt.util";
import { generateOtp } from "../../../utils/generate-otp.util";
import { createHttpError } from "../../../utils/http-error.util";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwt.util";
import { sendOtpEmail } from "../../../utils/send-Email.util";
import { IUserServices } from "../interface/IUser.services";

export class UserServices implements IUserServices {
  constructor(private _userRepository: IUserRepository) {}

  async signup(user: IUser): Promise<any> {
    user.phone_number = Number(user.phone_number);

    const emailExist = await this._userRepository.findByEmail(user.email);
    if (emailExist) {
      console.log("Email exist");
      throw createHttpError(HttpStatus.CONFLICT, HttpResponse.EMAIL_EXIST);
    }

    const phone_numberExist = await this._userRepository.findByNumber(
      user.phone_number
    );
    if (phone_numberExist) {
      console.log("phone exist");
      throw createHttpError(
        HttpStatus.CONFLICT,
        HttpResponse.PHONE_NUMBER_EXIST
      );
    }

    user.password = await hashPassword(user.password as string);

    const otp = generateOtp();
    console.log("OTP:", otp);
    await sendOtpEmail(user.email, otp);

    const otpKey = `otp:${user.email}`;
    const userKey = `user:${user.email}`;

    const otpredisResponce = await redisClient.setEx(otpKey, 60, String(otp));
    const otpUserResponce = await redisClient.setEx(
      userKey,
      3000,
      JSON.stringify(user)
    );

    if (!otpredisResponce || !otpUserResponce) {
      throw createHttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpResponse.REDIS_SAVE_FAILED
      );
    }

    return user.email;
  }

  async otpVerification(data: IOtp): Promise<IUserModel> {
    const { email, otp } = data;

    const otpKey = `otp:${email}`;
    const userKey = `user:${email}`;

    const storedOtp = await this._userRepository.findOtp(email);
    if (!storedOtp) {
      throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.OTP_NOT_FOUND);
    }

    if (storedOtp !== otp) {
      throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.OTP_INCORRECT);
    }

    const userDataStr = await this._userRepository.findOtpUserdata(email);
    if (!userDataStr) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        "User data not found in Redis"
      );
    }
    const userData = JSON.parse(userDataStr);
    userData.roles = [`${userData.role}`];
    const createdUser = await this._userRepository.createUser(userData);

    await redisClient.del(otpKey);
    await redisClient.del(userKey);
    return createdUser;
  }
  async resendOtp(data: IOtp): Promise<void> {
    const { email } = data;
    const newOtp = generateOtp();
    await sendOtpEmail(email, newOtp);
    const otpKey = `otp:${email}`;
    const otpredisResponce = await redisClient.setEx(
      otpKey,
      60,
      String(newOtp)
    );
    if (!otpredisResponce) {
      throw createHttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpResponse.REDIS_SAVE_FAILED
      );
    }
  }
  async login(data: ILogin): Promise<any> {
    const { email, password, role } = data;
    console.log("This is datas", data);
    const User = await this._userRepository.findByEmail(email);
    if (!User) {
      throw createHttpError(
        HttpStatus.UNAUTHORIZED,
        HttpResponse.USER_NOT_FOUND
      );
    }

    const isMatch = comparePassword(password, User.password);
    if (!isMatch) {
      throw createHttpError(
        HttpStatus.UNAUTHORIZED,
        HttpResponse.PASSWORD_INCORRECT
      );
    }
    if (!User.roles || !User.roles.includes(role)) {
      throw createHttpError(
        HttpStatus.UNAUTHORIZED,
        `You are not authorized to login as ${role}`
      );
    }
    if (User.role !== role) {
      await this._userRepository.findByIdAndUpdate(User._id, { role });
    }

    const payload = {
      _id: User._id,
      email: User.email,
      phone_number: User.phone_number,
      name: User.name,
      password: User.password,
      role: User.role,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken, User };
  }
}
