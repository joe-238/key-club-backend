export class Event {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public participants: Array<number>,
    public date: Date
  ) {}
}
