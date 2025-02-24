import { Request, Response } from "express";
import { productService } from "./products.services";
import { catchAsync } from "../../utils/catchAsync";
import { bicycleModel } from "./products.model";
import { sendResponse } from "../../utils/sendResponse";

const createBicycle = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await productService.createProductServiceInDB(payload);

    res.status(200).json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      const validationErrors = (err as { errors?: unknown }).errors;
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: err.name || 'ValidationError', 
          errors: validationErrors  || {
            message: err.message,
            name: 'ValidatorError',
            properties: {
              message: err.message,
            },
          },
        },
        stack: err.stack || 'No stack available',
      });
    }
  }
};


// const getAllBicycles = async (req: Request, res: Response) => {
//   try {
//    const result = await productService.getAllBicyclesServiceFromDB();
   
//    res.status(200).json({
//      success: true,
//      message: 'Bicycles retrieved successfully',
//      data: result,
//    });
   
//   } catch (error:unknown) {
//    res.status(405).json({
//    status:false,
//    message: error,
//    })
//   }
//  };
 const getAllBicycles = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getAllBicyclesServiceFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogpost retrived successfully',
    data: result,
  });
});
const getASingleBicycle = async (req: Request, res: Response) => {
  try {
  const {productId}=req.params;
   const result = await productService.getASingleBicycleFromDB(productId);
   
   res.status(200).json({
     success: true,
     message: 'Bicycles retrieved successfully',
     data: result,
   });
   
  } catch (error:unknown) {
   res.status(405).json({
   status:false,
   message: error,
   error: error,
   })
  }
 };
const deleteASingeBicycle = async (req: Request, res: Response) => {
  try {
  const {productId}=req.params;
 
   const result = await productService.deleteAsingleProductServiceFromDb(productId);
   res.status(200).json({
     message: 'Bicycles deleted  successfully',
     success: true,
     data: result,
   });
   
  } catch (error:unknown) {
   res.status(405).json({
   status:false,
   message: error,
   error: error,
   })
  }
 };
 
const updateBicycle = async (req: Request, res: Response) => {
  try {
  const {productId}=req.params;
  const payload = req.body;
  console.log(productId,payload)
   const result = await productService.updateBicleServiceFromDb(payload,productId);
   res.status(200).json({
     message: 'Bicycles updated successfully',
     success: true,
     data: result,
   });
   
  } catch (err: unknown) {
    if (err instanceof Error) {
      const validationErrors = (err as { errors?: unknown }).errors;
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: err.name || 'ValidationError', 
          errors: validationErrors  || {
            message: err.message,
            name: 'ValidatorError',
            properties: {
              message: err.message,
            },
          },
        },
        stack: err.stack || 'No stack available',
      });
    }
  }
 };
 
 export const productController = {
  createBicycle,
  getAllBicycles,
  getASingleBicycle,
  deleteASingeBicycle,
  updateBicycle
 }