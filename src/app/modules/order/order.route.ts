import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

router.get("/verify", orderController.verifyPayment);
router.post('/',orderController.createOrder);
router.get('/',orderController.getAllOrders);
router.get('/revenue',orderController.getRevenue);


export const orderRoutes = router;