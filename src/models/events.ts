import { v4 as uuidv4 } from "uuid";

/* export class Event {
  public id: string;
  constructor(
    public title: string,
    public type: string,
    public description: string,
    public location: string,
    public startTime: Date,
    public endTime: Date,
    public createdBy: number, //user id or osis
    public maxParticipants?: number,
    public createdAt: Date = new Date(),
  ) {
    this.id = uuidv4();
  }
}
 */

import { Schema, model } from "mongoose";
export interface IEvent {
  title: string;
  type: string;
  description: string;
  location: string;
  hours: number;
  startTime: Date;
  endTime: Date;
  createdBy: number;
  maxParticipants?: number;
  createdAt: Date;
  isDraft: boolean;
}
const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Number,
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  isDraft: {
    type: Boolean,
    required: true,
  },
});

export const event = model<IEvent>("event", eventSchema);
