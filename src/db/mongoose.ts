import mongoose from "mongoose";
import "dotenv/config";

config.dotenv();
export function connectDB() {
  mongoose
    .connect(process.env.DATABASE as string)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
}
