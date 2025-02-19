"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPostValidation = void 0;
const zod_1 = require("zod");
const createBlogPostZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty('Title is required'),
        content: zod_1.z.string().nonempty('Content is required'),
        author: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
const UpdateBlogPostZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
exports.blogPostValidation = {
    createBlogPostZodSchema,
    UpdateBlogPostZodSchema,
};
