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
exports.blogServices = void 0;
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const quaryMaker_1 = __importDefault(require("../../utils/quaryMaker"));
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield blog_model_1.default.create(payload)).populate('author');
    return result;
});
const getAllBlogFromDB = (quary) => __awaiter(void 0, void 0, void 0, function* () {
    const queryMaker = new quaryMaker_1.default(blog_model_1.default.find().populate('author', ' _id name email role isBlocked'), quary)
        .search(['title', 'content'])
        .sort()
        .filter();
    const result = yield queryMaker.QueryModel;
    return result;
});
const getSingleBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findById(id).populate('author', ' _id name email role isBlocked');
    return result;
});
const deleteBlogFrom = (id, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const findData = yield blog_model_1.default.findById(id);
    if (!findData) {
        throw new AppErrors_1.default(404, 'Blog post not found');
    }
    if (findData.author.toString() !== userID) {
        throw new AppErrors_1.default(401, 'You do not have permission to delete this data');
    }
    const result = yield blog_model_1.default.findByIdAndDelete(id);
    return result;
});
const updateBlogIntoDB = (payload, id, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const findData = yield blog_model_1.default.findById(id);
    if (!findData) {
        throw new AppErrors_1.default(404, 'Blog post not found');
    }
    if (findData.author.toString() !== userID) {
        throw new AppErrors_1.default(401, 'You do not have permission to update this data');
    }
    const result = yield blog_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.blogServices = {
    getAllBlogFromDB,
    getSingleBlogFromDB,
    createBlogIntoDB,
    deleteBlogFrom,
    updateBlogIntoDB,
};
