import { Time } from './Time';
import { TimeRange } from './TimeRange';

export class Round {
  ranges: TimeRange[] = [];

  constructor(ranges?: TimeRange[]) {
    if(ranges) {
      this.ranges = ranges;
    }
  }

  get lastRange(): TimeRange {
    return this.ranges[this.ranges.length - 1];
  }

  get firstRange(): TimeRange {
    return this.ranges[0];
  }

  get timeSummary(): Time {
    return this.ranges.reduce(
      (acc, timeRange) => {
        return acc.add(timeRange.time);
      },
      new Time(0)
    );
  }


  addRange(range: TimeRange) {
    this.ranges = [
      ...this.ranges,
      range
    ];
  }

  setEnd(date: Date){
    if(this.lastRange) {
      this.lastRange.setEnd(date);
    }
  }

  setStart(date: Date) {
    if(this.firstRange) {
      this.firstRange.setStart(date);
    }
  }

  static fromObject(content: any): Round {
    const ranges = content.ranges.map((range: any) => {
      return new TimeRange(
        new Date(range.start),
        new Date(range.end)
      )
    });
    return new Round(ranges)
  }
}
