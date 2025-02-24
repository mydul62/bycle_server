"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const products_model_1 = require("../products/products.model");
const order_model_1 = require("./order.model");
const order_services_1 = require("./order.services");
const createOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, streetAddress, apartment, city, postcode, orderNotes, products, totalPrice } = req.body;
    // Check if products array is empty
    if (!products || !Array.isArray(products) || products.length === 0) {
        res.status(400).json({ message: "Products are required", status: false });
        return;
    }
    // Validate each product
    for (const item of products) {
        const { product, quantity } = item;
        const foundProduct = yield products_model_1.bicycleModel.findById(product);
        if (!foundProduct) {
            res.status(400).json({ message: `Product with ID ${product} not found`, status: false });
            return;
        }
        if (foundProduct.stock < quantity) {
            res.status(400).json({ message: `Insufficient stock for product ID ${product}`, status: false });
            return;
        }
    }
    // Create order object
    const newOrder = {
        firstName,
        lastName,
        email,
        phone,
        streetAddress,
        apartment,
        city,
        postcode,
        orderNotes,
        products,
        totalPrice,
    };
    // Save order in database
    const result = yield order_services_1.orderService.createOrderServiceInDB(newOrder, req.ip);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Order placed successfully",
        data: result,
    });
}));
const verifyPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_services_1.orderService.verifyPayment(req.query.order_id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Order verified successfully",
        data: order,
    });
}));
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_model_1.orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" },
                },
            },
        ]);
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: revenue.length ? revenue[0].totalRevenue : 0,
        });
    }
    catch (error) {
        console.error("Error getting revenue:", error); // Debugging log
        res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_services_1.orderService.getAllOrderServiceFromDB();
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders,
        });
    }
    catch (error) {
        console.error("Error retrieving orders:", error); // Debugging log
        res.status(500).json({
            status: false,
            message: "Failed to retrieve orders",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const deleteOrderdb = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const data = yield order_services_1.orderService.deleteOrder(productId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: 201,
        data: data,
    });
}));
// Export the controller
exports.orderController = {
    createOrder,
    getRevenue,
    getAllOrders,
    verifyPayment, // ✅ Fixed typo
    deleteOrderdb
};
