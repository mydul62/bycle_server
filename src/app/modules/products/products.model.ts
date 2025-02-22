import { Schema, model } from 'mongoose';

const BicycleSchema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'The name of the bicycle is required.'] 
    },
    brand: { 
      type: String, 
      default: 'Linus' 
    },
    price: { 
      type: Number, 
      required: [true, 'The price of the bicycle is required.'], 
      min: [0, 'The price must be a positive value.'] 
    },
    type: { 
      type: String, 
      enum: {
        values: ['Road'], 
        message: '{VALUE} is not supported. Only Road type is allowed for this model.'
      },
      default: 'Road',
      required: [true, 'The type of the bicycle is required.']
    },
    description: { 
      type: String, 
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true }
      }
    ],
    stock: { 
      type: Number, 
      required: [true, 'The quantity of bicycles is required.'], 
      min: [0, 'The quantity cannot be negative.'],
      default: 1
    },
    inStock: { 
      type: Boolean, 
      default: true 
    },
    sku: { 
      type: Number, 
      required: [true, 'The SKU of the bicycle is required.'] 
    },
    category: { 
      type: String, 
      default: 'Bicycles'
    },
    tags: { 
      type: [String], 
      default: ['bicycle', 'shop'] 
    },
    image_url: { 
      type: String, 
      required: [true, 'The image URL of the bicycle is required.'] 
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const bicycleModel = model('Bicycles', BicycleSchema);
