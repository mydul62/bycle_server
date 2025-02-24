import QueryMaker from "../../utils/quaryMaker";
import { orderModel } from "../order/order.model";
import { Bicycle } from "./products.interface";
import { bicycleModel } from "./products.model";


const createProductServiceInDB =async (payload:Bicycle)=>{
  const result = await bicycleModel.create(payload)
  return result;
 }
// const getAllBicyclesServiceFromDB =async ()=>{
//   const result = await bicycleModel.find()
//   return result;
//  }

 const getAllBicyclesServiceFromDB = async (quary:Record<string , unknown>) => {
  const queryMaker = new QueryMaker(
    bicycleModel.find(),
    quary,
  )
    .search(['name',])
    .sort()
    .filter();
  const result = await queryMaker.QueryModel;
  return result;
};




 const getASingleBicycleFromDB =async (id:string)=>{
 
  const result = await bicycleModel.findById(id)
  return result;
 }
 
 const updateBicleServiceFromDb =async (payload:Bicycle,id:string)=>{
  const result = await bicycleModel.findOneAndUpdate({_id:id}, { $set: payload },{new:true})
  return result;
 }
 
 const deleteAsingleProductServiceFromDb = async (id: string) => {
  const result = await bicycleModel.deleteOne({ _id: id });

  const ordersWithProduct = await orderModel.find({ "products.product._id": id });

  for (const order of ordersWithProduct) {
    if (order.products.length > 1) {
      await orderModel.updateOne(
        { _id: order._id },
        { $pull: { products: { "product._id": id } } }
      );
    } else {
      await orderModel.deleteOne({ _id: order._id });
    }
  }

  return result;
};


 export const productService = {
 createProductServiceInDB,
 getAllBicyclesServiceFromDB,
 getASingleBicycleFromDB,
 deleteAsingleProductServiceFromDb,
 updateBicleServiceFromDb
 }