/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

export const handleValidationError = (err: any, res:Response)=>{
  const issues = Object.values(err.errors).map((val: any) => val.message);
  return res.status(400).json({
    success: false,
    name: 'Validation error',
    message: 'Invalid input',
    issues,
  });
}