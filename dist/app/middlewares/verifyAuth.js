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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppErrors_1 = __importDefault(require("../errors/AppErrors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
dotenv_1.default.config();
const verifyToken = (RequestRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
            if (!token) {
                res.status(401).json({ message: "Authorization header is missing" });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.secret_token);
            const { userID, role } = decoded;
            const userExist = user_model_1.default.findById(userID);
            if (!userExist) {
                throw new AppErrors_1.default(404, 'User not found');
            }
            if (!decoded) {
                throw new AppErrors_1.default(403, 'This user is not authorized');
            }
            if (role !== RequestRole) {
                throw new AppErrors_1.default(403, 'Insufficient permissions for this role');
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                res.status(401).json({ message: 'Invalid or expired token' });
                return;
            }
            next(error);
        }
    });
};
exports.default = verifyToken;
