import { HttpResponse } from "../../../constants/response-message.constant";
import { HttpStatus } from "../../../constants/status.constants";
import { IAdminRepositories } from "../../../repositories/admin/interface/IAdmin.repositories";
import { ILogin } from "../../../types/ILogin";
import { comparePassword } from "../../../utils/bcrypt.util";
import { createHttpError } from "../../../utils/http-error.util";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt.util";
import { IAdminServices } from "../interface/IAdmin.services";

export class AdminServices implements IAdminServices {
  constructor(private _adminRepositories: IAdminRepositories) {}
  async login(data: ILogin): Promise<any> {
    const { email, password } = data;
    const admin = await this._adminRepositories.findByEmail(email);
    if (!admin) {
      throw createHttpError(HttpStatus.FORBIDDEN, HttpResponse.EMAIL_EXIST);
    }
    const isMatch = comparePassword(password, admin.password);
    if (!isMatch) {
      throw createHttpError(
        HttpStatus.UNAUTHORIZED,
        HttpResponse.PASSWORD_INCORRECT
      );
    }
    const payload = {
      _id: admin._id,
      email: admin.email,
      password:admin.password
    }
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        return { accessToken, refreshToken, admin };
  }
    async addCategoryes(data: { name: string }): Promise<void> {
    const { name } = data;

    const existing = await this._adminRepositories.findCategoryByName(name);
    if (existing) {
      throw createHttpError(HttpStatus.CONFLICT, "Category already exists");
    }

    await this._adminRepositories.createCategory({ name });
  }
  async addAmenities(data: { name: string; }):Promise<void> {
     const { name } = data;

    const existing = await this._adminRepositories.findAmenitiesByName(name);
    if (existing) {
      throw createHttpError(HttpStatus.CONFLICT, "Category already exists");
    }

    await this._adminRepositories.createAmenities({ name });
  }
  
}
