import { Router } from 'express';
import { uservalidationAll } from './user.validation';
import { AlluserController } from './user.controller';
import { authorizeRole } from '../../middlewares/verifyAuth';
import { validation } from '../../middlewares/validation';

const router = Router();
router.post(
  '/register',
  validation(uservalidationAll.userRegistervalidation),
  AlluserController.userRegister,
);
router.post(
  '/login',
  validation(uservalidationAll.userLoginvalidation),
  AlluserController.userLogin,
);
router.post(
  '/refresh-token',
  AlluserController.refreshToken,
);
router.get('/alluser',authorizeRole(['admin']), AlluserController.AlluserGet);
router.get('/sigleusr',authorizeRole(['user','admin']),AlluserController.singleUser);
router.put('/upateuser',authorizeRole(['user','admin']), AlluserController.upateUser);
router.put('/updateRole/:id', authorizeRole(['admin']), AlluserController.UpdateRole)
router.delete('/deletedUsers/:id',authorizeRole(['admin']),  AlluserController.DeletedUser)
router.put('/changePassword', authorizeRole(['user','admin']), AlluserController.changePasswordService)
export const userRouter = router;
