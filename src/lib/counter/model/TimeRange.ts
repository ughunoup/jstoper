import { Time } from './Time';

export class TimeRange {
  start: Date;
  end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  get time(): Time {
    return new Time(this.end.getTime() - this.start.getTime())
  }

  setEnd(end: Date) {
    this.end = end;
  }


  setStart(start: Date) {
    this.start = start;
  }

  getTimeSum(): number {
    return this.end.getTime() - this.start.getTime();
  }
}
