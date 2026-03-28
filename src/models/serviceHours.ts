/* export class ServiceHours {
  constructor(
    public id: string,
    public userId: string,
    public hours: number,
    public date: Date,
  ) {}
} */

import { Schema, model, Types } from "mongoose";
export interface IServiceHours {
  eventId: Types.ObjectId;
  userId: string;
  hours: number;
  date: Date;
}
const serviceHoursSchema = new Schema<IServiceHours>({
  eventId: {
    type: Types.ObjectId,
    required: true,
    ref: "event",
  },
  userId: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const serviceHours = model<IServiceHours>(
  "serviceHours",
  serviceHoursSchema
);
