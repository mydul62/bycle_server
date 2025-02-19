"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const AuthRegistrationzodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required", invalid_type_error: 'Name must be a string', }),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
        role: zod_1.z.enum(["admin", "user"]).optional(),
        isBlocked: zod_1.z.boolean().optional(),
    }),
});
const userLoginvalidationzodShema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'please must be fill up email field',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'please must be fill up password field',
            invalid_type_error: 'Name must be a string',
        }),
    }),
});
exports.AuthValidation = {
    AuthRegistrationzodSchema,
    userLoginvalidationzodShema
};
