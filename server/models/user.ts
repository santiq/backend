import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.js";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    role: {
      type: String,
      trim: true,
      default: 'user',
    },
    password: {
      type: String,
      trim: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          return `${this.first_name} ${this.last_name}`;
        },
      },
    },
  }
);

export default mongoose.model<IUser & mongoose.Document>(
  "User",
  UserSchema,
  "users"
);
