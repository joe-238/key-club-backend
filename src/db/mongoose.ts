import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.DATABASE as string);
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
}
