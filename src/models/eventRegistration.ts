export type RegistrationStatus = "joined" | "attended" | "no-show";

/* 
import { v4 as uuidv4 } from "uuid";
export class EventRegistration {
  public id: string;
  public status: RegistrationStatus;
  constructor(
    public eventId: string,
    public userId: number,
  ) {
    this.id = uuidv4();
    this.status = "joined";
  }
} */

import { Schema, model } from "mongoose";
export interface IEventRegistration {
  id: number;
  status: RegistrationStatus;
  eventId: string;
  userId: number;
}
const eventRegistrationSchema = new Schema<IEventRegistration>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
});

export const eventRegistration = model<IEventRegistration>(
  "eventRegistration",
  eventRegistrationSchema,
);
