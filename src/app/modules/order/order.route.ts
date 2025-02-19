import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();


router.post('/',orderController.createOrder);
router.get('/',orderController.gerAllOrders);
router.get('/revenue',orderController.getRevenue);


export const orderRoutes = router;