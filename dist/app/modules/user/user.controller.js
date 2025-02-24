"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlluserController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRegister = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield user_service_1.AlluserService.userRegisterService(body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: 201,
        data: data,
    });
}));
const userLogin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield user_service_1.AlluserService.userLoginService(body);
    const { accessToken, refreshToken } = data;
    res.cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Login successful',
        statusCode: 200,
        data: accessToken,
    });
}));
const refreshToken = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield user_service_1.AlluserService.refreshTokenService(refreshToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: result,
    });
}));
const AlluserGet = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.AlluserService.AlluserGet();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'All user retrieved succesfully!',
        data: result,
    });
}));
const UpdateRole = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.AlluserService.UpdateRole(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'user Roll update succesfully!',
        data: result,
    });
}));
const changePasswordService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.userID;
    const result = yield user_service_1.AlluserService.changePasswordService(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Password Change succesfully!',
        data: result,
    });
}));
const singleUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.userID;
    const result = yield user_service_1.AlluserService.singleUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'single user retrive succesfully!',
        data: result,
    });
}));
const upateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = req.user.userId;
    // const body = req.body
    // // const result = await AlluserService.upateUser(id, body);
    // sendResponse(res, {
    //   statusCode: 200,
    //   success: true,
    //   message: 'user profile update succesfully!',
    //   data: result,
    // });
}));
const DeletedUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.AlluserService.DeletedUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Deleted user succesfully!',
        data: result,
    });
}));
exports.AlluserController = {
    userRegister,
    userLogin,
    refreshToken,
    AlluserGet,
    UpdateRole,
    DeletedUser,
    changePasswordService,
    upateUser,
    singleUser
};
