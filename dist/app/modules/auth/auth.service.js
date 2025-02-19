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
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../user/user.model"));
const config_1 = __importDefault(require("../../config"));
dotenv_1.default.config();
const userRegisterService = (password, remaining) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassword = password;
    const saltRounds = 10;
    const hash = yield bcrypt_1.default.hash(newPassword, saltRounds);
    const userData = Object.assign(Object.assign({}, remaining), { password: hash });
    const result = yield user_model_1.default.create(userData);
    return result;
});
const userLoginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const RegisterUser = yield user_model_1.default.findOne({ email: payload.email });
    if (!RegisterUser) {
        throw new AppErrors_1.default(404, 'Invalid credential');
    }
    const matchPassword = yield bcrypt_1.default.compare(payload.password, RegisterUser.password);
    if (!matchPassword) {
        throw new AppErrors_1.default(401, 'Invalid credential');
    }
    const token = jsonwebtoken_1.default.sign({
        userID: RegisterUser._id,
        role: RegisterUser.role,
    }, config_1.default.secret_token, { expiresIn: 60 * 60 });
    return { token };
});
exports.AuthService = {
    userRegisterService,
    userLoginService,
};
