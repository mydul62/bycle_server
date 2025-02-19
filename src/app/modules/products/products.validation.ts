import { z } from "zod";


const colorSchema = z.object({
  name: z.string({ required_error: "Color name is required." }),
  hex: z
    .string({ required_error: "Color hex is required." })
  
});

export const bycleValidationZodSchema = z.object({
  body: z.object({
    id: z.number({ required_error: "ID is required." }),
    name: z.string({ required_error: "Name is required." }),
    price: z
      .number({ required_error: "Price is required." })
      .min(0, { message: "Price must be a positive number." }),
    rating: z
      .number({ required_error: "Rating is required." })
      .min(0, "Rating cannot be negative.")
      .max(5, "Rating cannot exceed 5."),
    description: z.string({ required_error: "Description is required." }),
    colors: z
      .array(colorSchema, { required_error: "Colors array is required." })
      .nonempty("At least one color is required."),
    stock: z
      .number({ required_error: "Stock is required." })
      .min(0, { message: "Stock cannot be negative." }),
    category: z.string({ required_error: "Category is required." }),
    tags: z.array(z.string()).optional(),
    sku: z
      .number({ required_error: "SKU is required." })
      .min(0, { message: "SKU must be a positive number." }),
      image_url: z
      .string({ required_error: "Image URL is required." })
      // .url("Invalid URL format."),
  }),
});

export const bycleValidation = {
  bycleValidationZodSchema,
};
