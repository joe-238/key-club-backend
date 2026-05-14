import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export enum Role {
  MEMBER = "member",
  ADMIN = "admin",
  OFFICER = "officer",
}
export interface IUser extends Document {
  osis: number; //osis or maybe use uuid, if use uuid change it to string
  name: string;
  email: string;
  password: string;
  grade: number;
  role: Role;
  totalServiceHours: number;
  profileImage: string;
  comparePassword(candidate: string): Promise<boolean>;
}
const userSchema = new Schema<IUser>(
  {
    osis: {
      type: Number,
      required: true,
      unique: true,
      min: 100000000,
      max: 999999999,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    grade: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.MEMBER,
    },
    totalServiceHours: {
      type: Number,
      default: 0,
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);
userSchema.pre("save", async function () {
  //pre("save", ...) → Tells Mongoose “Before a User document is saved to MongoDB, run this function
  if (!this.isModified("password")) return; //prevents hashing a hash

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});
userSchema.methods.comparePassword = async function (
  candidate: string,
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};
export const User = model<IUser>("User", userSchema);
