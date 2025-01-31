import connectDB from "./config/db";
import app from "./app";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({
  path: path.join(__dirname, "../.env"),
});

// Start the server
async function start() {
  try {
    await connectDB();

    const PORT = process.env.ENV_PORT || "8000";

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
}

start();
