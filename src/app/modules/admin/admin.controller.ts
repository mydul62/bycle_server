import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";


const createAdmin = catchAsync(async (req:Request, res: Response) => {
  const result = await AdminServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});
const blockBlogByAdmin = catchAsync(async (req:Request, res: Response) => {
 const {id,block} = req.params;
  const result = await AdminServices.blockUserIntoDB(id,block);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user block successfully",
    data: result,
  });
});
const deleteBlogByAdmin = catchAsync(async (req:Request, res: Response) => {
 const {id} = req.params;
  const result = await AdminServices.deleteBlogByAdminFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "blog deleted successfully",
    data: result,
  });
});

export const adminController = {
  createAdmin,
  deleteBlogByAdmin,
  blockBlogByAdmin
};