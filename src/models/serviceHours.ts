/* export class ServiceHours {
  constructor(
    public id: string,
    public userId: string,
    public hours: number,
    public date: Date,
  ) {}
} */

import { Schema, model } from "mongoose";
export interface IServiceHours {
  id: number;
  userId: string;
  hours: number;
  date: Date;
}
const serviceHoursSchema = new Schema<IServiceHours>({
  id: {
    type: Number,
    required: true,
    unique: true,
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
  serviceHoursSchema,
);
