import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bicycleModel } from "../products/products.model";
import { Order } from "./order.interface";
import { orderModel } from "./order.model";
import { orderService } from "./order.services";
import { Response, Request } from "express";

const createOrder =  catchAsync(async (req, res) => {    const { 
  firstName, lastName, email, phone, streetAddress, 
  apartment, city, postcode, orderNotes, products, totalPrice 
} = req.body;

// Check if products array is empty
if (!products || !Array.isArray(products) || products.length === 0) {
  res.status(400).json({ message: "Products are required", status: false });
  return;
}

// Validate each product
for (const item of products) {
  const { product, quantity } = item;

  const foundProduct = await bicycleModel.findById(product);
  if (!foundProduct) {
    res.status(400).json({ message: `Product with ID ${product} not found`, status: false });
    return;
  }
  if (foundProduct.stock < quantity) {
    res.status(400).json({ message: `Insufficient stock for product ID ${product}`, status: false });
    return;
  }


}

// Create order object
const newOrder: Order = {
  firstName,
  lastName,
  email,
  phone,
  streetAddress,
  apartment,
  city,
  postcode,
  orderNotes,
  products,
  totalPrice,
};

// Save order in database
const result = await orderService.createOrderServiceInDB(newOrder,req.ip!);

sendResponse(res, {
        statusCode: 200,
        message: "Order placed successfully",
        data: result,
      })
      })
      
const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: 200,
    message: "Order verified successfully",
    data: order,
  });
});
const getRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const revenue = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: revenue.length ? revenue[0].totalRevenue : 0,
    });

  } catch (error) {
    console.error("Error getting revenue:", error); // Debugging log

    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await orderService.getAllOrderServiceFromDB();
  
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });

  } catch (error) {
    console.error("Error retrieving orders:", error); // Debugging log

    res.status(500).json({
      status: false,
      message: "Failed to retrieve orders",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
const deleteOrderdb =catchAsync(async (req, res) => {
  const {productId}=req.params;
  const data = await orderService.deleteOrder(productId);
  
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: data,
  });
});


// Export the controller
export const orderController = {
  createOrder,
  getRevenue,
  getAllOrders, 
  verifyPayment,// ✅ Fixed typo
  deleteOrderdb
};
