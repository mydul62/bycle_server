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
exports.orderService = void 0;
const products_model_1 = require("../products/products.model");
const order_model_1 = require("./order.model");
const order_utils_1 = require("./order.utils");
const createOrderServiceInDB = (payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new order_model_1.orderModel(payload);
    let order = yield newOrder.save();
    // Payment integration
    const shurjopayPayload = {
        amount: payload.totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: payload.firstName,
        customer_address: payload.streetAddress,
        customer_email: payload.email,
        customer_phone: payload.phone,
        customer_city: payload.city,
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        yield order_model_1.orderModel.findOneAndUpdate({ _id: order._id }, {
            $set: {
                transaction: {
                    id: payment.sp_order_id,
                    transactionStatus: payment.transactionStatus,
                },
            },
        }, { new: true } // Return the updated document
        );
    }
    return payment;
});
const getAllOrderServiceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allOrder = yield order_model_1.orderModel.find().populate("products.product");
    return allOrder;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        const order = yield order_model_1.orderModel.findOneAndUpdate({
            "transaction.id": order_id,
        }, {
            "transaction.bank_status": verifiedPayment[0].bank_status,
            "transaction.sp_code": verifiedPayment[0].sp_code,
            "transaction.sp_message": verifiedPayment[0].sp_message,
            "transaction.transactionStatus": verifiedPayment[0].transaction_status,
            "transaction.method": verifiedPayment[0].method,
            "transaction.date_time": verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status === "Success"
                ? "Paid"
                : verifiedPayment[0].bank_status === "Failed"
                    ? "Pending"
                    : verifiedPayment[0].bank_status === "Cancel"
                        ? "Cancelled"
                        : "",
        }, { new: true });
        if (order && verifiedPayment[0].bank_status === "Success") {
            const bycle = yield products_model_1.bicycleModel.findById(order._id);
            if (bycle) {
                // bycle.stock -= order.quantity;
                if (bycle.stock === 0) {
                    bycle.inStock = false;
                }
                yield bycle.save();
            }
        }
    }
    return verifiedPayment;
});
exports.orderService = {
    createOrderServiceInDB,
    getAllOrderServiceFromDB,
    verifyPayment,
};
