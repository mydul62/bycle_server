"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uservalidationAll = void 0;
const zod_1 = require("zod");
const userRegistervalidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'please must be fill up name field',
            invalid_type_error: 'Name must be a string',
        }),
        email: zod_1.z
            .string({
            required_error: 'please must be fill up email field',
            invalid_type_error: 'Name must be a string',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'please must be fill up password field',
            invalid_type_error: 'Name must be a string',
        }),
    }),
});
const userLoginvalidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'please must be fill up email field',
            invalid_type_error: 'Name must be a string',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'please must be fill up password field',
            invalid_type_error: 'Name must be a string',
        }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
exports.uservalidationAll = {
    userLoginvalidation,
    userRegistervalidation,
    refreshTokenValidationSchema
};
