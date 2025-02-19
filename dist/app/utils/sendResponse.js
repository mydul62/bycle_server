"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data.data,
    });
};
exports.sendResponse = sendResponse;
