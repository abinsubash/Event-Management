import { redisClient } from "../../../configs/redis.config";
import { HttpResponce } from "../../../constants/response-message.constant";
import { HttpStatus } from "../../../constants/status.constants";
import { IUserRepository } from "../../../repositories/user/interface/IUser.repository";
import { IOtp } from "../../../types/IOtp";
import { IUser } from "../../../types/IUser";
import { hashPassword } from "../../../utils/bcrypt.util";
import { generateOtp } from "../../../utils/generate-otp.util";
import { createHttpError } from "../../../utils/http-error.util";
import { sendOtpEmail } from "../../../utils/send-Email.util";
import { IUserAuthServices } from "../interface/IUser-auth.services";

export class UserAuthServices implements IUserAuthServices {
  constructor(private _userRepository: IUserRepository) {}

  async signup(user: IUser): Promise<any> {
    user.phone_number = Number(user.phone_number);
    console.log("this is user", user);

    const emailExist = await this._userRepository.findByEmail(user.email);
    if (emailExist) {
      throw createHttpError(HttpStatus.CONFLICT, HttpResponce.EMAIL_EXIST);
    }

    const phone_numberExist = await this._userRepository.findByNumber(
      user.phone_number
    );
    if (phone_numberExist) {
      throw createHttpError(
        HttpStatus.CONFLICT,
        HttpResponce.PHONE_NUMBER_EXIST
      );
    }

    user.password = await hashPassword(user.password as string);

    const otp = generateOtp();
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
        HttpResponce.REDIS_SAVE_FAILED
      );
    }

    return user.email;
  }

  async otpVerification(data: IOtp): Promise<any> {
    const { email, otp } = data;
    const otpResponce = await this._userRepository.findOtp(email)
    console.log('user Otp' ,otpResponce)
    const otpDetails = await this._userRepository.findOtpUserdata(email)
    console.log('this is user data',otpDetails)
  }
}
