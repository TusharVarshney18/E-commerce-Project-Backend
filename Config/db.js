import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const mongokey = process.env.MONGO_KEY;

export const connectDB = async () => {
  if (!mongokey) {
    console.error("MongoDB connection string (MONGO_KEY) is not defined");
    process.exit(1); // Exit the process with failure
  }

  try {
    await mongoose.connect(mongokey);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
