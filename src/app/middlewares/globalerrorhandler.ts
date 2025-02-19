/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleValidationError } from '../helper/handleValidationError';
import { ZodError } from '../helper/handleZodError';

type TErrorResponse = {
  statusCode: number;
  message: string;
  error: any;
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof mongoose.Error.CastError) {
    const statusCode = 404;
    res.status(statusCode).json({
      success: false,
      message: err.message,
      error: err,
    });
  } else if (err.code && err.code === 11000) {
    const statusCode = 400;
    res.status(statusCode).json({
      success: false,
      message: err.errorResponse.errmsg || 'Duplicate error',
      error: err,
    });
  }
  else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } 
  else if (err.name && err.name ==='ZodError') {
    ZodError(err, res);
  } 
  else if (err instanceof Error) {
    const statusCode =  500;
    res.status(statusCode).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};
