import { z } from "zod";

const colorSchema = z.object({
  name: z.string({ required_error: "Color name is required." }),
  hex: z.string({ required_error: "Color hex is required." }),
});

export const bicycleValidationZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }),
    price: z
      .number({ required_error: "Price is required." })
      .min(0, { message: "Price must be a positive number." }),
    description: z.string({ required_error: "Description is required." }),
    colors: z
      .array(colorSchema, { required_error: "Colors array is required." })
      .nonempty("At least one color is required."),
    stock: z
      .number({ required_error: "Stock is required." })
      .min(0, { message: "Stock cannot be negative." }),
    category: z.string({ required_error: "Category is required." }).default("Bicycles"),
    tags: z.array(z.string()).optional(),
    sku: z
      .number({ required_error: "SKU is required." })
      .min(0, { message: "SKU must be a positive number." }),
    image_url: z
      .string({ required_error: "Image URL is required." })
      .url("Invalid URL format."), // Uncomment this to enforce URL validation
  }),
});

// Exporting the validation schema
export const bicycleValidation = {
  bicycleValidationZodSchema,
};
