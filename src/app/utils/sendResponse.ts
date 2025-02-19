import { Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendResponse=(res:Response,data:any)=>{
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    data:data.data,
  });
}