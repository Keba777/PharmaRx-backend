import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { sendEmail } from "../utils/emailService";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const OTPStorage: Record<string, string> = {};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, email, phone, role, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    const user = new User({ firstName, email, phone, role, address });
    await user.save();

    await sendEmail(
      email,
      "Welcome to PharmaRx - Registration Successful",
      `Dear ${firstName},\n\nWelcome to PharmaRx! 🎉\n\nYour account has been successfully registered.\n\nIf you have any questions, feel free to reach out to our support team.\n\nBest regards,\nPharmaRx Team`
    );    

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found. Please register first." });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    OTPStorage[email] = otp;

    await sendEmail(email, "Your Login OTP Code", `Your OTP is: ${otp}`);

    res.status(200).json({ message: "OTP sent to email for login verification" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  try {
    if (!OTPStorage[email] || OTPStorage[email] !== otp) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }

    delete OTPStorage[email];

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found. Please register first." });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "OTP verified successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};
