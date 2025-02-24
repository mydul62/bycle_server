import { Router } from "express";
import { productRouters } from "../modules/products/products.route";
import { orderRoutes } from "../modules/order/order.route";
import { userRouter } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/bycles',
    route: productRouters,
  },
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/orders',
    route: orderRoutes,
  }
];

moduleRoutes.forEach((route) =>  router.use(route.path,route.route));


export default router;