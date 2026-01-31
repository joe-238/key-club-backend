export type RegistrationStatus = "joined" | "attended" | "no-show";

export class EventRegistration {
  constructor(
    public id: string,
    public userId: string,
    public eventId: string,
    public status: RegistrationStatus = "joined",
  ) {}
}
