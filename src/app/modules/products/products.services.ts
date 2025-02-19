import QueryMaker from "../../utils/quaryMaker";
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
    .search(['name', 'description'])
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
 
 const deleteAsingleProductServiceFromDb =async (id:string)=>{
 
  const result = await bicycleModel.deleteOne({_id:id},{new:true})
  return result;
 }
 export const productService = {
 createProductServiceInDB,
 getAllBicyclesServiceFromDB,
 getASingleBicycleFromDB,
 deleteAsingleProductServiceFromDb,
 updateBicleServiceFromDb
 }