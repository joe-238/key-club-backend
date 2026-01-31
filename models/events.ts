import { v4 as uuidv4 } from "uuid";

export class Event {
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
