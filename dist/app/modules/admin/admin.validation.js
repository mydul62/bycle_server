"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = void 0;
const zod_1 = require("zod");
const adminValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
        role: zod_1.z.enum(["admin", "user"]).optional(),
    }),
});
exports.adminValidation = {
    adminValidationZodSchema,
};
