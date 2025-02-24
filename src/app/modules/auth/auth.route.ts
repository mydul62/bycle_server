import { Router } from 'express';
import { uservalidationAll } from './auth.validation';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';


const router = Router();
router.post(
  '/register',
  validateRequest(uservalidationAll.userRegistervalidation),
  AuthControllers.userRegister,
);
router.post(
  '/login',
  validateRequest(uservalidationAll.userLoginvalidation),
  AuthControllers.userLogin,
);
router.post(
  '/refresh-token',
  validateRequest(uservalidationAll.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.get('/alluser', AuthControllers.AlluserGet);
router.put('/updateRole/:id', AuthControllers.UpdateRole)
router.delete('/deletedUser/:id', AuthControllers.DeletedUser)


export const authRouter = router;