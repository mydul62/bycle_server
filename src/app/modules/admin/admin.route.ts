import express from 'express';
import { adminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidation } from './admin.validation';
import verifyToken from '../../middlewares/verifyAuth';
const router = express.Router();


router.post('/create-admin',validateRequest(adminValidation.adminValidationZodSchema),adminController.createAdmin);
// router.delete('/blogs/:id',verifyToken('admin'),adminController.deleteBlogByAdmin);
router.patch('/users/:id/:block',verifyToken('admin'),adminController.blockBlogByAdmin);

export const adminRoute = router;