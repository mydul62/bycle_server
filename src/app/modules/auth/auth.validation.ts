import { z } from "zod";

const AuthRegistrationzodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required",invalid_type_error: 'Name must be a string', }),
    email: z.string().email({ message: "Invalid email address"}),
    password: z.string({ required_error: "Password is required" }),
    role: z.enum(["admin", "user"]).optional(),
    isBlocked: z.boolean().optional(),
  }),
});

const userLoginvalidationzodShema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'please must be fill up email field',
      })
      .email(),
    password: z.string({
      required_error: 'please must be fill up password field',
      invalid_type_error: 'Name must be a string',
    }),
  }),
});

export const AuthValidation={
  AuthRegistrationzodSchema,
  userLoginvalidationzodShema
};
