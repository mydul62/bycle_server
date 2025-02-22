import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import AppErrors from '../../errors/AppErrors';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // Check if the email already exists
  const email = this.email;
  const existingUser = await usermodel.findOne({ email });

  if (existingUser) {
    throw new AppErrors(409, 'This user is already registered');
  }

  // Hash the password if it is modified or new
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next(); // Proceed to the next middleware or save operation
});

export const usermodel = model('user', userSchema);
