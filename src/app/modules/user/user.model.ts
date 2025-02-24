import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import AppErrors from '../../errors/AppErrors';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    phone: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dateOfBirth: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const existingUser = await usermodel.findOne({ email: this.email });
    if (existingUser) {
      throw new AppErrors(409, 'This user is already registered');
    }
  }

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

export const usermodel = model<IUser>('User', userSchema);
