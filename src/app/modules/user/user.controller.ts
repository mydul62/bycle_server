import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";


const createUser = catchAsync(async (req:Request, res: Response) => {
   const {password,...remaining}=req.body;
  const result = await userServices.createUserIntoDB(password,remaining);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const userController = {
  createUser,
};