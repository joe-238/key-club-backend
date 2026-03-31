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
  userId: Types.ObjectId;
}
const eventRegistrationSchema = new Schema<IEventRegistration>({
  status: {
    type: String,
    required: true,
    enum: ["joined", "attended", "no-show"],
    default: "joined",
  },
  eventId: {
    type: Types.ObjectId,
    required: true,
    ref: "event",
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
});
eventRegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });
export const EventRegistration = model<IEventRegistration>(
  "eventRegistration",
  eventRegistrationSchema
);
