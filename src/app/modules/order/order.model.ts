import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi phone number"],
    },
    streetAddress: {
      type: String,
      required: [true, "Street address is required"],
    },
    apartment: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    postcode: {
      type: String,
      required: [true, "Postcode is required"],
    },
    orderNotes: {
      type: String,
      default: "",
    },
    products: [
      {
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
        price: {
          type: Number,
          required: [true, "Price is required"],
          min: [1, "Price must be at least 1"],
        },
        status:{
          type:String,
          enum:["Pending","Paid","Shipped","Complete","Cancelled"],
          default:"Pending"
        }
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [1, "Total price must be at least 1"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const orderModel = model("Order", orderSchema);
