"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouters = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const products_validation_1 = require("./products.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(products_validation_1.bycleValidation.bycleValidationZodSchema), products_controller_1.productController.createBicycle);
router.get('/', products_controller_1.productController.getAllBicycles);
router.get('/:productId', products_controller_1.productController.getASingleBicycle);
router.delete('/:productId', products_controller_1.productController.deleteASingeBicycle);
router.put('/:productId', products_controller_1.productController.updateBicycle);
exports.productRouters = router;
