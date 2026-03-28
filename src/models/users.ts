/* import { Event } from "./events";
import { EventRegistration } from "./eventRegistration";


export class User {
  constructor(
    //runs automatically when you create a new object from a class
    public id: number, //osis or maybe use uuid, if use uuid change it to string
    public name: string,
    public email: string,
    private password: string,
    public grade: number,
    public role: UserRole = "member",
    public totalServiceHours: number,
  ) {}
  changePassword(newPassword: string) {
    this.password = newPassword;
  }
  joinEvent(eventId: string, userId: number) {
    return new EventRegistration(eventId, userId);
  }
  deleteAccount() {
    //waiot...
  }
}

export class AdminUser extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    grade: number,
  ) {
    super(id, name, email, password, grade, "admin", 0);
  }
  deleteUser(userId: number) {
    console.log(`Deleted user ${userId}`);
  }
  createEvent(
    title: string,
    type: string,
    description: string,
    location: string,
    startTime: Date,
    endTime: Date,
    createdBy: number,
    maxParticipants?: number,
  ): Event {
    return new Event(
      title,
      type,
      description,
      location,
      startTime,
      endTime,
      createdBy,
      maxParticipants,
    );
  }
} */

import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
export type UserRole = "member" | "admin" | "officer";
export interface IUser extends Document {
  osis: number; //osis or maybe use uuid, if use uuid change it to string
  name: string;
  email: string;
  password: string;
  grade: number;
  role: UserRole;
  totalServiceHours: number;

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
      enum: ["member", "admin", "officer"],
      default: "member",
    },
    totalServiceHours: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  //pre("save", ...) → Tells Mongoose “Before a User document is saved to MongoDB, run this function
  if (!this.isModified("password")) return; //prevents hashing a hash

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});
userSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export const User = model<IUser>("user", userSchema);
