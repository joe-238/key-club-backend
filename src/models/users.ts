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

import { Schema, model } from "mongoose";
export type UserRole = "member" | "admin" | "officer";
export interface IUser {
  id: number; //osis or maybe use uuid, if use uuid change it to string
  name: string;
  email: string;
  password: string;
  grade: number;
  role: UserRole;
  totalServiceHours: number;
}
const userSchema = new Schema<IUser>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
});

export const user = model<IUser>("user", userSchema);
