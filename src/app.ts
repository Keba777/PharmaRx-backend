import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/user.route";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

export default app;
