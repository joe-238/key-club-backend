import { v4 as uuidv4 } from "uuid";
export type RegistrationStatus = "joined" | "attended" | "no-show";

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
}
