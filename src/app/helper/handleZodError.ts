/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

export const ZodError = (err: any, res:Response)=>{
  const issues = Object.values(err.issues).map((val: any) => {
   return {
    path: val.path,
    message: val.message,
   
   }
  
  });
  return res.status(400).json({
    success: false,
    name: 'Validation error',
    message: 'Invalid input',
    issues,
  });
}