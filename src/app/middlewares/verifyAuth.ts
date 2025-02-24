import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppErrors from '../errors/AppErrors';
import dotenv from 'dotenv';
dotenv.config();

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const token = authHeader;

    if (!token) {
      throw new AppErrors(404, 'This token does not exist');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
      if (!decoded) {
        throw new AppErrors(403, 'This user is not authorized');
      }
      if (!roles.includes(decoded.role)) {
        throw new AppErrors(403, 'Forbidden: Insufficient permissions!');
      }

      req.user = decoded;

      next();
    } catch (error: unknown) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppErrors(401, 'Invalid or expired token');
      }
      next(error);
    }
  };
};
