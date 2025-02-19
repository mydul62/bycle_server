import { z } from "zod";



const orderValidationZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .regex(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address"
      ),
    product: z
      .string({ required_error: "Product ID is required" }),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .min(1, "Quantity must be at least 1"),

    totalPrice: z
      .number()
      .min(1, "Total price must be at least 1")
      .optional(), 
  }),
});

export const orderValidation = {
  orderValidationZodSchema,
};
