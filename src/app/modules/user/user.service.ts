
import { TUser } from "./user.interface";
import userModel from "./user.model";
import bcrypt from "bcrypt";
const createUserIntoDB =async(password:string,remaining:TUser)=>{
  const newPassword = password

  const saltRounds = 10;
    const hash = await bcrypt.hash(newPassword, saltRounds);
    const userData = {...remaining, password:hash};

  const result = await userModel.create(userData);
 return result;
}

export const userServices = {
 createUserIntoDB,
}