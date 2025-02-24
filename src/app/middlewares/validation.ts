import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validation = (Schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};
