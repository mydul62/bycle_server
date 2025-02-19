"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundError = void 0;
// import status from "http-status";
const notFoundError = (req, res) => {
    const message = "API not found";
    res.status(404).json({
        success: false,
        message,
        error: ' '
    });
    return;
};
exports.notFoundError = notFoundError;
