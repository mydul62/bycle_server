interface OrderProduct {
  product: string; // Assuming it's an ObjectId in string format
  quantity: number;
}

 export interface Order {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string; // Optional field
  city: string;
  postcode: string;
  orderNotes?: string; // Optional field
  products: OrderProduct[];
  totalPrice: number;
}
