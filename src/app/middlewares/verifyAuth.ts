import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppErrors from '../errors/AppErrors';
import dotenv from 'dotenv';
import config from '../config';
import userModel from '../modules/user/user.model';

dotenv.config();

const verifyToken = (RequestRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader)
      const token =  authHeader?.split(" ")[1]
      if (!token) {
         res.status(401).json({ message: "Authorization header is missing" });
         return;
      }

      const decoded = jwt.verify(token, config.secret_token as string) as JwtPayload;
     const {userID,role} = decoded;
     const userExist = userModel.findById(userID);
     if(!userExist){
       throw new AppErrors(404, 'User not found');
     }
      if (!decoded) {
        throw new AppErrors(403, 'This user is not authorized');
      }
      if (role !== RequestRole) {
        throw new AppErrors(403, 'Insufficient permissions for this role');
      }

      req.user = decoded; 
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
         res.status(401).json({ message: 'Invalid or expired token' });
         return;
      }
      next(error);
    }
  };
};

export default verifyToken;
