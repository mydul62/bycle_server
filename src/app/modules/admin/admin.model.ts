import mongoose, { Schema } from "mongoose";
import { TAdmin } from "./admin.interface";


const AdminSchema: Schema = new Schema<TAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
}, {
  timestamps: true,
});

const adminModel = mongoose.model<TAdmin>("Admin", AdminSchema);
export default adminModel;
