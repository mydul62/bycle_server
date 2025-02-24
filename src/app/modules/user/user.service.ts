/* eslint-disable @typescript-eslint/no-unused-vars */
import AppErrors from '../../errors/AppErrors';
import { usermodel } from './user.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from './user.interface';
import config from '../../config';
dotenv.config();
const userRegisterService = async (body: IUser) => {
  const result = await usermodel.create(body);

  return {
    name: result.name,
    email: result.email,
  };
};
const userLoginService = async (body: IUser) => {
  const RegisterUser = await usermodel.findOne({ email: body.email });
  if (!RegisterUser) {
    throw new AppErrors(404, 'Invalid credentials');
  }

  const matchPassword = await bcrypt.compare(body.password, RegisterUser.password);
  if (!matchPassword) {
    throw new AppErrors(401, 'Invalid credentials');
  }

  const accessToken = jwt.sign(
    { userID: RegisterUser._id, role: RegisterUser.role },
    config.secret_token as string,
    { expiresIn: '15d' } 
  );

  const refreshToken = jwt.sign(
    { userID: RegisterUser._id },
    config.secret_token as string,
    { expiresIn: '15d' } 
  );
  console.log(refreshToken)
  return { accessToken,refreshToken}; 
};
const refreshTokenService = async (token: string | undefined): Promise<string> => {
  if (!token) {
    throw new AppErrors(403, 'Refresh token is required');
  }
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
    const {userID}=decoded as JwtPayload;

  const user = await usermodel.findById(userID);
  if (!user) {
    throw new AppErrors(403, 'User not found');
  }

  // Generate new Access Token
  const newAccessToken = jwt.sign(
    { userID: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7m' }
  );

  return newAccessToken;
};

const AlluserGet = async () => {
  const result = await usermodel.find();
  return result
};
interface User {
  _id: string;
  role: 'user' | 'admin'; 
  save(): Promise<void>;
}

const UpdateRole = async (userId: string) => {
    const user = await usermodel.findById(userId) as User | null;

    if (!user) {
      return { message: 'User not found' };
    }

    const newRole = user.role === 'user' ? 'admin' : 'user';
    user.role = newRole;
    const result = await usermodel.findOneAndUpdate(
      { _id: userId }, 
      { $set: { role: newRole } },
      { new: true } 
    );
    return result
  };
const DeletedUser = async (id: string) => {
  const result = await usermodel.findByIdAndDelete({ _id: id });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changePasswordService = async (userId: string, body:any) => {
  const user = await usermodel.findById(userId);
  if (!user) {
    throw new AppErrors(404, 'User not found');
  }
  const isPasswordMatch = await bcrypt.compare(body.oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new AppErrors(401, 'Old password is incorrect');
  }
  user.password = body.newPassword;
  await user.save();
  return { message: 'Password changed successfully' };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const upateUser = async (userID: string, body:any) => {
console.log(userID,body)
  const updatedUser = await usermodel.findByIdAndUpdate(
    userID,
    body,
    { new: true, runValidators: true }
  ); 
  return updatedUser
};
const singleUser = async (userId: string) => {
  const result  = await usermodel.findOne({_id:userId})
  return result
};

export const AlluserService = {
  userRegisterService,
  userLoginService,
  refreshTokenService,
  AlluserGet,
  UpdateRole,
  DeletedUser,
  changePasswordService,
  upateUser,
  singleUser
  
};
