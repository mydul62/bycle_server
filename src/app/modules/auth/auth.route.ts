import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();
router.post(
  '/register',
  validateRequest(AuthValidation.AuthRegistrationzodSchema),
  AuthControllers.userRegister,
);
router.post(
  '/login',
  validateRequest(AuthValidation.userLoginvalidationzodShema),
  AuthControllers.userLogin,
);
export const authRouter = router;