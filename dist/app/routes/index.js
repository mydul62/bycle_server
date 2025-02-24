"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_route_1 = require("../modules/products/products.route");
const order_route_1 = require("../modules/order/order.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/bycles',
        route: products_route_1.productRouters,
    },
    {
        path: '/auth',
        route: user_route_1.userRouter,
    },
    {
        path: '/orders',
        route: order_route_1.orderRoutes,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
