import { Schema, model, Types } from "mongoose";
export type AnnouncementStatus = "draft" | "published";
export interface IAnnouncement {
  status: AnnouncementStatus;
  publisher: Types.ObjectId;
  title: string;
  description: string;
  //add image here
}
const announcementSchema = new Schema<IAnnouncement>({
  status: {
    type: String,
    required: true,
    enum: ["draft", "published"],
    default: "draft",
  },
  publisher: {
    type: Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const announcement = model<IAnnouncement>(
  "announcement",
  announcementSchema
);
