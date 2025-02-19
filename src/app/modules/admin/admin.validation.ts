import { z } from "zod";

const adminValidationZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }),
    role: z.enum(["admin", "user"]).optional(),
  }),
});

export const adminValidation={
  adminValidationZodSchema,
};
