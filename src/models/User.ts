import mongoose, { Document, Schema } from "mongoose";
import { check, validationResult } from "express-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";

// Define User roles
const roles = ["customer", "pharmacist", "admin"] as const;
type Role = (typeof roles)[number];

interface IUser extends Document {
  firstName: string;
  email: string;
  phone: string;
  role: Role;
  address: string;
  otp?: string; 
  otpExpires?: Date; 
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false, unique: true, sparse: true },
    role: { type: String, enum: roles, required: true },
    address: { type: String, required: false },
    otp: { type: String, required: false },
    otpExpires: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;

export const validateUser: RequestHandler[] = [
  check("firstName").notEmpty().withMessage("First name is required").isString().withMessage("First name must be a string"),
  check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
  check("phone")
    .optional()
    .custom((value) => {
      const phoneNumber = /^\+?[1-9]\d{6,14}$/;
      if (!phoneNumber.test(value)) {
        throw new Error("Invalid phone number format");
      }
      return true;
    })
    .withMessage("Invalid phone number"),
  check("role").notEmpty().withMessage("Role is required").isIn(roles).withMessage(`Role must be one of: ${roles.join(", ")}`),
  check("address").optional().isString().withMessage("Address must be a string"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];
