export class User {
  constructor(
    //runs automatically when you create a new object from a class
    public id: number,
    public name: string,
    public grade: number,
    public email: string,
    public isAdmin: boolean,
    private password: string
  ) {}
  joinEvent(userId: number) {
    console.log(`${userId} joined this event lalala`);
  }
}

export class AdminUser extends User {
  constructor(
    id: number,
    name: string,
    grade: number,
    email: string,
    password: string
  ) {
    super(id, name, grade, email, true, password);
  }
  deleteUser(userId: number) {
    console.log(`Deleted user ${userId}`);
  }
}
