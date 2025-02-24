import { z } from "zod";

export const orderValidationZodSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi phone number"),
    streetAddress: z.string().min(1, "Street address is required"),
    apartment: z.string().optional(),
    city: z.string().min(1, "City is required"),
    postcode: z.string().min(1, "Postcode is required"),
    orderNotes: z.string().optional(),
    products: z.array(
      z.object({
        product: z.string().min(1, "Product ID is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        price: z.number().min(1, "Price must be at least 1"),
      })
    ),
    status: z.enum(["Pending", "Paid", "Shipped", "Complete", "Cancelled"]),
    orderDate: z.date().default(() => new Date()),
    transaction: z
      .object({
        id: z.string().optional(),
        transactionStatus: z.string().optional(),
        bank_status: z.string().optional(),
        sp_code: z.string().optional(),
        sp_message: z.string().optional(),
        method: z.string().optional(),
        date_time: z.string().optional(),
      })
      .optional(),
    totalPrice: z.number().min(1, "Total price must be at least 1"),
  }),
});

export const orderValidation = {
  orderValidationZodSchema,
};