type BicycleType = 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';

export interface Bicycle {
  name: string;
  brand: string;
  price: number;
  type: BicycleType;
  description: string;
  quantity: number;
  inStock: boolean;
}