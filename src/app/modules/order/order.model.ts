import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Bicycles",
      required: [true, "Product ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
      type: Number,
      min: [1, "Total price must be at least 1"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const orderModel = model("Order", orderSchema);
