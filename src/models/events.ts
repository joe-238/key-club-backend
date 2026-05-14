import { Schema, model, Types } from "mongoose";

export interface IEvent {
  title: string;
  type: string;
  description: string;
  location: string;
  hours: number;
  startTime: Date;
  endTime: Date;
  createdBy: Types.ObjectId;
  maxParticipants?: number;
  isDraft: boolean;

  image?: string;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    hours: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    maxParticipants: { type: Number },

    isDraft: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Event = model<IEvent>("Event", eventSchema);
