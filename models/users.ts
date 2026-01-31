import { Event } from "./events";
export type UserRole = "member" | "admin" | "officer";

export class User {
  constructor(
    //runs automatically when you create a new object from a class
    public id: number, //osis
    public name: string,
    public email: string,
    private password: string,
    public grade: number,
    public role: UserRole = "member",
    public totalServiceHours: number,
  ) {}
  changePassword(newPassword: string) {
    this.password = newPassword;
  }
  joinEvent(eventId: number) {
    console.log(`joined ${eventId} `);
  }
}

export class AdminUser extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    grade: number,
  ) {
    super(id, name, email, password, grade, "admin", 0);
  }
  deleteUser(userId: number) {
    console.log(`Deleted user ${userId}`);
  }
  createEvent(
    title: string,
    type: string,
    description: string,
    location: string,
    startTime: Date,
    endTime: Date,
    createdBy: number,
    maxParticipants?: number,
  ): Event {
    return new Event(
      title,
      type,
      description,
      location,
      startTime,
      endTime,
      createdBy,
      maxParticipants,
    );
  }
}
