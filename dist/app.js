"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalerrorhandler_1 = require("./app/middlewares/globalerrorhandler");
const notFound_1 = require("./app/middlewares/notFound");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ["https://bycle-zone.vercel.app"],
    credentials: true }));
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(globalerrorhandler_1.errorHandler);
app.use(notFound_1.notFoundError);
exports.default = app;
