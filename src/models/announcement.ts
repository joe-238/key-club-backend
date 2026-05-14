import { Schema, model, Types } from "mongoose";
export type AnnouncementStatus = "draft" | "published";
export interface IAnnouncement {
  status: AnnouncementStatus;
  publisher: Types.ObjectId;
  title: string;
  description: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const announcementSchema = new Schema<IAnnouncement>(
  {
    status: {
      type: String,
      required: true,
      enum: ["draft", "published"],
      default: "draft",
    },

    publisher: {
      type: Schema.Types.ObjectId,
      ref: "User", // optional but recommended
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const announcement = model<IAnnouncement>(
  "announcement",
  announcementSchema,
);
