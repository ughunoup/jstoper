import { numberToString } from '../converters/numberToString';

interface TimeViewModel {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const HOURS_DIVIDER = 1000 * 60 * 60;
const MINUTES_DIVIDER = 1000 * 60;
const SECONDS_DIVIDER = 1000;

export type FormatOption = '00' | '000';

export class Time {
  private readonly value: number;
  private viewModel: TimeViewModel;

  constructor(timeInMs: number) {
    this.value = timeInMs;
    this.viewModel = this.getViewModel();
  }

  add(time: Time): Time {
    return new Time(time.getValue() + this.getValue());
  }

  getValue(): number {
    return this.value;
  }

  get hours(): number {
    return this.viewModel.hours;
  }

  get minutes(): number {
    return this.viewModel.minutes;
  }

  get seconds(): number {
    return this.viewModel.seconds;
  }

  get milliseconds(): number {
    return this.viewModel.milliseconds;
  }


  getViewModel(): TimeViewModel {
    if (!this.viewModel) {
      const hours = Math.floor(this.value / HOURS_DIVIDER);
      const hoursRemainder = this.value % HOURS_DIVIDER;

      const minutes = Math.floor(hoursRemainder / MINUTES_DIVIDER);
      const minutesRemainder = this.value % MINUTES_DIVIDER;

      const seconds = Math.floor(minutesRemainder / SECONDS_DIVIDER);
      const milliseconds = this.value % SECONDS_DIVIDER;

      this.viewModel = {
        hours,
        minutes,
        seconds,
        milliseconds,
      };
    }

    return this.viewModel
  }

  toString(): string {
    let result = [
      numberToString(this.minutes, '00'),
      numberToString(this.seconds, '00'),
    ];

    if(this.hours) {
      result = [
        numberToString(this.hours, '00'),
        ...result,
      ]
    }

    return result.join(':')
  }
}
