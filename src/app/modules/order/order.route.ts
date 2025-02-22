import express from 'express';
import { orderController } from './order.controller';
import { UserRole } from '../user/user.constant';
import verifyToken from '../../middlewares/verifyAuth';
const router = express.Router();

router.get("/verify", verifyToken(UserRole.user), orderController.verifyPayment);
router.post('/',orderController.createOrder);
router.get('/',orderController.getAllOrders);
router.get('/revenue',orderController.getRevenue);


export const orderRoutes = router;