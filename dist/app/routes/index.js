"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_route_1 = require("../modules/blogs/blog.route");
const user_route_1 = require("../modules/user/user.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/blogs',
        route: blog_route_1.blogRouters,
    },
    {
        path: '/users',
        route: user_route_1.userRoute,
    },
    {
        path: '/admin',
        route: admin_route_1.adminRoute,
    },
    {
        path: '/auth',
        route: auth_route_1.authRouter,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
