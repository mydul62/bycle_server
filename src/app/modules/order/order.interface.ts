import { Types } from "mongoose";

export interface Order {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
}
