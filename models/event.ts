import { v4 as uuidv4 } from "uuid";

export class Event {
  public id: string;
  constructor(
    public title: string,
    public type: string,
    public participants: number[],
    public date: Date
  ) {
    this.id = uuidv4();
  }
}
