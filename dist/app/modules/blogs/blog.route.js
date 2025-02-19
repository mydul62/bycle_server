"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouters = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const verifyAuth_1 = __importDefault(require("../../middlewares/verifyAuth"));
const router = express_1.default.Router();
router.get('/', blog_controller_1.blogController.getAllBlog);
router.post('/', (0, verifyAuth_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.blogPostValidation.createBlogPostZodSchema), blog_controller_1.blogController.createBlog);
router.get('/:id', blog_controller_1.blogController.getSingleBlog);
router.delete('/:id', (0, verifyAuth_1.default)('user'), blog_controller_1.blogController.deleteBlog);
router.patch('/:id', (0, verifyAuth_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.blogPostValidation.UpdateBlogPostZodSchema), blog_controller_1.blogController.UpdateBlog);
exports.blogRouters = router;
