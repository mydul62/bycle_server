"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bycleValidation = exports.bycleValidationZodSchema = void 0;
const zod_1 = require("zod");
const colorSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Color name is required." }),
    hex: zod_1.z
        .string({ required_error: "Color hex is required." })
});
exports.bycleValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required." }),
        price: zod_1.z
            .number({ required_error: "Price is required." })
            .min(0, { message: "Price must be a positive number." }),
        rating: zod_1.z
            .number({ required_error: "Rating is required." })
            .min(0, "Rating cannot be negative.")
            .max(5, "Rating cannot exceed 5."),
        description: zod_1.z.string({ required_error: "Description is required." }),
        colors: zod_1.z
            .array(colorSchema, { required_error: "Colors array is required." })
            .nonempty("At least one color is required."),
        stock: zod_1.z
            .number({ required_error: "Stock is required." })
            .min(0, { message: "Stock cannot be negative." }),
        category: zod_1.z.string({ required_error: "Category is required." }),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        sku: zod_1.z
            .number({ required_error: "SKU is required." })
            .min(0, { message: "SKU must be a positive number." }),
        image_url: zod_1.z
            .string({ required_error: "Image URL is required." })
        // .url("Invalid URL format."),
    }),
});
exports.bycleValidation = {
    bycleValidationZodSchema: exports.bycleValidationZodSchema,
};
