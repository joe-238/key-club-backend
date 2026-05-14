import { Schema, model, Types } from "mongoose";

export interface IServiceHours {
  eventId: Types.ObjectId;
  userId: Types.ObjectId;
  hours: number;
  date: Date;
}

const serviceHoursSchema = new Schema<IServiceHours>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

export const ServiceHours = model<IServiceHours>(
  "ServiceHours",
  serviceHoursSchema,
);
