import { redisClient } from "../../../configs/redis.config";
import User, { IUserModel } from "../../../models/implementation/user.model";
import { BaseRepository } from "../../bace.repository";
import { IUserRepository } from "../interface/IUser.repository";

export class UserRepository
  extends BaseRepository<IUserModel>
  implements IUserRepository
{
  constructor() {
    super(User);
  }
  async findByEmail(email: string): Promise<IUserModel | null> {
    try {
      return await User.findOne({ email: email });
    } catch (err) {
      console.log(err);
      throw new Error("Error finding user by email");
    }
  }
  async findByNumber(phone_number: number): Promise<IUserModel | null> {
    try {
      return await User.findOne({ phone_number: phone_number });
    } catch (err) {
      console.log(err);
      throw new Error("Error finding user by phone_number");
    }
  }
  async findOtp(email: string): Promise<string | null> {
    try {
      const otpKey = `otp:${email}`;
      return await redisClient.get(otpKey);
    } catch (err) {
      console.log(err);
      throw new Error("Error finding OTP");
    }
  }
  async findOtpUserdata(email: string):Promise<any> {
    try {
      const userKey = `user:${email}`;
      return await redisClient.get(userKey);
    } catch (err) {
      console.log(err);
      throw new Error("Error finding userdetials")
    }
  }
}
