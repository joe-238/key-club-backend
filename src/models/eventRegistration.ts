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

import { Schema, model, Types } from "mongoose";
export type RegistrationStatus = "joined" | "attended" | "no-show";
export interface IEventRegistration {
  status: RegistrationStatus;
  eventId: Types.ObjectId;
  userId: number;
}
const eventRegistrationSchema = new Schema<IEventRegistration>({
  status: {
    type: String,
    required: true,
  },
  eventId: {
    type: Types.ObjectId,
    required: true,
    ref: "event",
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
