"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = exports.orderValidationZodSchema = void 0;
const zod_1 = require("zod");
exports.orderValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(1, "First name is required"),
        lastName: zod_1.z.string().min(1, "Last name is required"),
        email: zod_1.z
            .string()
            .email("Please enter a valid email address"),
        phone: zod_1.z
            .string()
            .regex(/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi phone number"),
        streetAddress: zod_1.z.string().min(1, "Street address is required"),
        apartment: zod_1.z.string().optional(),
        city: zod_1.z.string().min(1, "City is required"),
        postcode: zod_1.z.string().min(1, "Postcode is required"),
        orderNotes: zod_1.z.string().optional(),
        products: zod_1.z.array(zod_1.z.object({
            product: zod_1.z.string().min(1, "Product ID is required"),
            quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
            price: zod_1.z.number().min(1, "Price must be at least 1"),
        })),
        status: zod_1.z.enum(["Pending", "Paid", "Shipped", "Complete", "Cancelled"]),
        orderDate: zod_1.z.date().default(() => new Date()),
        transaction: zod_1.z
            .object({
            id: zod_1.z.string().optional(),
            transactionStatus: zod_1.z.string().optional(),
            bank_status: zod_1.z.string().optional(),
            sp_code: zod_1.z.string().optional(),
            sp_message: zod_1.z.string().optional(),
            method: zod_1.z.string().optional(),
            date_time: zod_1.z.string().optional(),
        })
            .optional(),
        totalPrice: zod_1.z.number().min(1, "Total price must be at least 1"),
    }),
});
exports.orderValidation = {
    orderValidationZodSchema: exports.orderValidationZodSchema,
};
