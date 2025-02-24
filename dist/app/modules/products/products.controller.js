"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const products_services_1 = require("./products.services");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const createBicycle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield products_services_1.productService.createProductServiceInDB(payload);
        res.status(200).json({
            success: true,
            message: 'Bicycle created successfully',
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            const validationErrors = err.errors;
            res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    name: err.name || 'ValidationError',
                    errors: validationErrors || {
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
});
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
const getAllBicycles = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_services_1.productService.getAllBicyclesServiceFromDB(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Blogpost retrived successfully',
        data: result,
    });
}));
const getASingleBicycle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_services_1.productService.getASingleBicycleFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Bicycles retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(405).json({
            status: false,
            message: error,
            error: error,
        });
    }
});
const deleteASingeBicycle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_services_1.productService.deleteAsingleProductServiceFromDb(productId);
        res.status(200).json({
            message: 'Bicycles deleted  successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(405).json({
            status: false,
            message: error,
            error: error,
        });
    }
});
const updateBicycle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const payload = req.body;
        console.log(productId, payload);
        const result = yield products_services_1.productService.updateBicleServiceFromDb(payload, productId);
        res.status(200).json({
            message: 'Bicycles updated successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            const validationErrors = err.errors;
            res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    name: err.name || 'ValidationError',
                    errors: validationErrors || {
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
});
exports.productController = {
    createBicycle,
    getAllBicycles,
    getASingleBicycle,
    deleteASingeBicycle,
    updateBicycle
};
