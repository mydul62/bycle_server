"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const verifyAuth_1 = require("../../middlewares/verifyAuth");
const validation_1 = require("../../middlewares/validation");
const router = (0, express_1.Router)();
router.post('/register', (0, validation_1.validation)(user_validation_1.uservalidationAll.userRegistervalidation), user_controller_1.AlluserController.userRegister);
router.post('/login', (0, validation_1.validation)(user_validation_1.uservalidationAll.userLoginvalidation), user_controller_1.AlluserController.userLogin);
router.post('/refresh-token', user_controller_1.AlluserController.refreshToken);
router.get('/alluser', (0, verifyAuth_1.authorizeRole)(['admin']), user_controller_1.AlluserController.AlluserGet);
router.get('/sigleusr', (0, verifyAuth_1.authorizeRole)(['user', 'admin']), user_controller_1.AlluserController.singleUser);
router.put('/updateuser', (0, verifyAuth_1.authorizeRole)(['user', 'admin']), user_controller_1.AlluserController.upateUserInDB);
router.put('/updateRole/:id', (0, verifyAuth_1.authorizeRole)(['admin']), user_controller_1.AlluserController.UpdateRole);
router.delete('/deletedUsers/:id', (0, verifyAuth_1.authorizeRole)(['admin']), user_controller_1.AlluserController.DeletedUser);
router.put('/changePassword', (0, verifyAuth_1.authorizeRole)(['user', 'admin']), user_controller_1.AlluserController.changePasswordService);
exports.userRouter = router;
