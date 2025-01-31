// routes/userRoutes.ts
import { Router } from "express";
import { registerUser, loginUser, verifyOTP } from "../controllers/user.controller";
import { validateUser } from "../models/User";
import  authenticateUser  from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);  
router.post("/verify-otp", verifyOTP);
router.get("/profile", authenticateUser, (req, res) => {
    res.json({ message: "This is a protected route"});
  });

export default router;
