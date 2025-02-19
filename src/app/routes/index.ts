import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { adminRoute } from "../modules/admin/admin.route";
import { authRouter } from "../modules/auth/auth.route";
import { productRouters } from "../modules/products/products.route";
import { orderRoutes } from "../modules/order/order.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/bycles',
    route: productRouters,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/orders',
    route: orderRoutes,
  }
];

moduleRoutes.forEach((route) =>  router.use(route.path,route.route));


export default router;