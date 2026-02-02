import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
