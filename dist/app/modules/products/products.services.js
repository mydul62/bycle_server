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
exports.productService = void 0;
const quaryMaker_1 = __importDefault(require("../../utils/quaryMaker"));
const order_model_1 = require("../order/order.model");
const products_model_1 = require("./products.model");
const createProductServiceInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.bicycleModel.create(payload);
    return result;
});
// const getAllBicyclesServiceFromDB =async ()=>{
//   const result = await bicycleModel.find()
//   return result;
//  }
const getAllBicyclesServiceFromDB = (quary) => __awaiter(void 0, void 0, void 0, function* () {
    const queryMaker = new quaryMaker_1.default(products_model_1.bicycleModel.find(), quary)
        .search(['name',])
        .filter();
    const result = yield queryMaker.QueryModel;
    return result;
});
const getASingleBicycleFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.bicycleModel.findById(id);
    return result;
});
const updateBicleServiceFromDb = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.bicycleModel.findOneAndUpdate({ _id: id }, { $set: payload }, { new: true });
    return result;
});
const deleteAsingleProductServiceFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.bicycleModel.deleteOne({ _id: id });
    const ordersWithProduct = yield order_model_1.orderModel.find({ "products.product._id": id });
    for (const order of ordersWithProduct) {
        if (order.products.length > 1) {
            yield order_model_1.orderModel.updateOne({ _id: order._id }, { $pull: { products: { "product._id": id } } });
        }
        else {
            yield order_model_1.orderModel.deleteOne({ _id: order._id });
        }
    }
    return result;
});
exports.productService = {
    createProductServiceInDB,
    getAllBicyclesServiceFromDB,
    getASingleBicycleFromDB,
    deleteAsingleProductServiceFromDb,
    updateBicleServiceFromDb
};
