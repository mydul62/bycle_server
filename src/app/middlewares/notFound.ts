import {  Request, Response } from "express";
// import status from "http-status";
export const notFoundError = ( req:Request, res:Response, ) => {
  const message = "API not found";
   res.status(404).json({
    success: false,
    message,
    error:' '
  });
  return;
};