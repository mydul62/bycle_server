"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.get("/verify", order_controller_1.orderController.verifyPayment);
router.post('/', order_controller_1.orderController.createOrder);
router.get('/', order_controller_1.orderController.getAllOrders);
router.get('/revenue', order_controller_1.orderController.getRevenue);
router.delete('/:productId', order_controller_1.orderController.deleteOrderdb);
exports.orderRoutes = router;
