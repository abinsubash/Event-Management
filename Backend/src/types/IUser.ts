export type UserRole = 'user' | 'owner' | 'employee';

export interface IUser {
  _id:string;
  name: string;
  phone_number: number;
  email: string;
  password: string;
  role: UserRole; 
  roles?:UserRole[];
  profile_image?: string;
  status?: "active" | "blocked";
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}