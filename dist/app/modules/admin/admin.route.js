"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const verifyAuth_1 = __importDefault(require("../../middlewares/verifyAuth"));
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.adminValidation.adminValidationZodSchema), admin_controller_1.adminController.createAdmin);
router.delete('/blogs/:id', (0, verifyAuth_1.default)('admin'), admin_controller_1.adminController.deleteBlogByAdmin);
router.patch('/users/:id/:block', (0, verifyAuth_1.default)('admin'), admin_controller_1.adminController.blockBlogByAdmin);
exports.adminRoute = router;
