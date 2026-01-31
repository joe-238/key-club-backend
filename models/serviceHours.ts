export class ServiceHours {
  constructor(
    public id: string,
    public userId: string,
    public hours: number,
    public date: Date,
  ) {}
}
