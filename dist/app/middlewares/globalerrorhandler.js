"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const handleValidationError_1 = require("../helper/handleValidationError");
const handleZodError_1 = require("../helper/handleZodError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof mongoose_1.default.Error.CastError) {
        const statusCode = 404;
        res.status(statusCode).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
    else if (err.code && err.code === 11000) {
        const statusCode = 400;
        res.status(statusCode).json({
            success: false,
            message: err.errorResponse.errmsg || 'Duplicate error',
            error: err,
        });
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        (0, handleValidationError_1.handleValidationError)(err, res);
    }
    else if (err.name && err.name === 'ZodError') {
        (0, handleZodError_1.ZodError)(err, res);
    }
    else if (err instanceof Error) {
        const statusCode = 500;
        res.status(statusCode).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
};
exports.errorHandler = errorHandler;
