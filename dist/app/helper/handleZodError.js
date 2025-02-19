"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodError = void 0;
const ZodError = (err, res) => {
    const issues = Object.values(err.issues).map((val) => {
        return {
            path: val.path,
            message: val.message,
        };
    });
    return res.status(400).json({
        success: false,
        name: 'Validation error',
        message: 'Invalid input',
        issues,
    });
};
exports.ZodError = ZodError;
