import express from 'express';
import { productController } from './products.controller';
import validateRequest from '../../middlewares/validateRequest';
import { bycleValidation } from './products.validation';
const router = express.Router();


router.post('/',validateRequest(bycleValidation.bycleValidationZodSchema),productController.createBicycle);
router.get('/',productController.getAllBicycles);
router.get('/:productId',productController.getASingleBicycle);
router.delete('/:productId',productController.deleteASingeBicycle);
router.put('/:productId',productController.updateBicycle);

export const productRouters = router;