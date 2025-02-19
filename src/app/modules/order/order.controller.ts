import { bicycleModel } from '../products/products.model';
import { orderModel } from './order.model';
import { orderService } from './order.services';
import { Response, Request } from 'express';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;
    const foundProduct = await bicycleModel.findById(product);
    if (!foundProduct) {
      res.status(400).json({ message: 'Product not found', status: false });
      return;
    }
    if (foundProduct.quantity < quantity) {
      res.status(400).json({ message: 'Insufficient stock', status: false });
      return;
    }
    foundProduct.quantity -= quantity;

    if (foundProduct.quantity === 0) {
      foundProduct.inStock = false;
      return;
    }
    await foundProduct.save();

    const newOrder = {
      email,
      product,
      quantity,
      totalPrice,
    };
    const result = await orderService.createOrderServiceInDB(newOrder);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      const validationErrors = (err as { errors?: unknown }).errors;
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: err.name || 'ValidationError',
          errors: validationErrors || {
            message: err.message,
            name: 'ValidatorError',
            properties: {
              message: err.message,
            },
          },
        },
        stack: err.stack || 'No stack available',
      });
    }
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await orderModel.aggregate([
      {
        $lookup: {
          from: 'bicycles',
          let: { productId: '$product' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', { $toObjectId: '$$productId' }],
                },
              },
            },
          ],
          as: 'BicycleDetails',
        },
      },
      {
        $unwind: '$BicycleDetails',
      },
      {
        $project: {
          totalRevenuePerOrder: {
            $multiply: ['$quantity', '$BicycleDetails.price'],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalRevenuePerOrder' },
        },
      },
    ]);
    if (revenue.length === 0) {
      res.status(200).json({
        message: 'No revenue calculated, no orders found',
        status: true,
        data: { totalRevenue: 0 },
      });
      return;
    }

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue: revenue[0].totalRevenue },
    });
  } catch (error: unknown) {
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};
const gerAllOrders = async (req: Request, res: Response) => {
  try {
    const orders =await orderService.getAllOrderServiceFromDB();
    
    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: orders,
    });
    
  } catch (error: unknown) {
    res.status(405).json({
      status: false,
      message: error,
    });
  }
};

export const orderController = {
  createOrder,
  getRevenue,
  gerAllOrders,
};
