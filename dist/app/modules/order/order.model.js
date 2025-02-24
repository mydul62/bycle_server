"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId,
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
        },
    ],
    status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Complete", "Cancelled"],
        default: "Pending"
    },
    orderDate: {
        type: Date,
        default: Date.now, // Automatically sets today's date when an order is created
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        min: [1, "Total price must be at least 1"],
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.orderModel = (0, mongoose_1.model)("Order", orderSchema);
