import { Order } from "./order.interface";
import { orderModel } from "./order.model";



const createOrderServiceInDB = async (payload: Order) => {
  const newOrder = new orderModel(payload);
  const result = await newOrder.save();
  return await result.populate("product");
};
const getAllOrderServiceFromDB = async () => {
  const allOrder =await orderModel.find().populate("product");
  return allOrder;
};


 export const orderService = {
  createOrderServiceInDB,
  getAllOrderServiceFromDB
  
 }