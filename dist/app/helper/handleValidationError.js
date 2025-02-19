"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err, res) => {
    const issues = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
        success: false,
        name: 'Validation error',
        message: 'Invalid input',
        issues,
    });
};
exports.handleValidationError = handleValidationError;
