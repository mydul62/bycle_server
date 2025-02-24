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
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../user/user.model");
dotenv_1.default.config();
const userRegisterService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.usermodel.create(body);
    return {
        name: result.name,
        email: result.email,
    };
});
const userLoginService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const RegisterUser = yield user_model_1.usermodel.findOne({ email: body.email });
    if (!RegisterUser) {
        throw new AppErrors_1.default(404, 'Invalid credentials');
    }
    const matchPassword = yield bcrypt_1.default.compare(body.password, RegisterUser.password);
    if (!matchPassword) {
        throw new AppErrors_1.default(401, 'Invalid credentials');
    }
    const accessToken = jsonwebtoken_1.default.sign({ userID: RegisterUser._id, role: RegisterUser.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ userID: RegisterUser._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
});
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppErrors_1.default(403, 'Refresh token is required');
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
    const { userID } = decoded;
    const user = yield user_model_1.usermodel.findById(userID);
    if (!user) {
        throw new AppErrors_1.default(403, 'User not found');
    }
    // Generate new Access Token
    const newAccessToken = jsonwebtoken_1.default.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    return newAccessToken;
});
const AlluserGet = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.usermodel.find();
    return result;
});
const UpdateRole = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.usermodel.findById(userId);
        if (!user) {
            return { message: 'User not found' };
        }
        const newRole = user.role === 'user' ? 'admin' : 'user';
        user.role = newRole;
        yield user.save();
        return { message: `User role updated to ${newRole}` };
    }
    catch (error) {
        return { message: 'An error occurred while updating the user role.' };
    }
});
const DeletedUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.usermodel.findByIdAndDelete({ _id: id });
    return result;
});
exports.AuthService = {
    userRegisterService,
    userLoginService,
    refreshTokenService,
    AlluserGet,
    UpdateRole,
    DeletedUser
};
