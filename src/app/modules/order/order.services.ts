import { Order } from "./order.interface";
import { orderModel } from "./order.model";
import { orderUtils } from "./order.utils";


const createOrderServiceInDB = async (payload: Order,client_ip:string) => {
  const newOrder = new orderModel(payload);
  let order = await newOrder.save();
  
  
  // payment integration
  const shurjopayPayload = {
    amount: payload.totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: payload.firstName,
    customer_address: payload.streetAddress,
    customer_email: payload.email,
    customer_phone: payload.phone,
    customer_city: payload.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await orderModel.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment;
};
const getAllOrderServiceFromDB = async () => {
  const allOrder =await orderModel.find();
  return allOrder;
};
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils. verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await orderModel.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }
  

  return verifiedPayment;
};


 export const orderService = {
  createOrderServiceInDB,
  getAllOrderServiceFromDB,
  verifyPayment
  
 }