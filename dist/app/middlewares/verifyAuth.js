"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppErrors_1 = __importDefault(require("../errors/AppErrors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader;
        if (!token) {
            throw new AppErrors_1.default(404, 'This token does not exist');
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                throw new AppErrors_1.default(403, 'This user is not authorized');
            }
            if (!roles.includes(decoded.role)) {
                throw new AppErrors_1.default(403, 'Forbidden: Insufficient permissions!');
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new AppErrors_1.default(401, 'Invalid or expired token');
            }
            next(error);
        }
    };
};
exports.authorizeRole = authorizeRole;
