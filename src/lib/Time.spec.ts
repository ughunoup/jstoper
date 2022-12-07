import { Time } from './Time';

describe('Timer', function () {
  it('should initialize', () => {
    const timer = new Time(1000);
    expect(timer).toBeTruthy();
  });

  it('should return 1h 30m 30s 500ms time object for 5430500 ms', () => {
    const timer = new Time(5430500);
    const expectedResult = {
      hours: 1,
      minutes: 30,
      seconds: 30,
      milliseconds: 500
    };
    expect(timer.getViewModel()).toEqual(expectedResult);
    expect(timer.hours).toEqual(expectedResult.hours);
    expect(timer.minutes).toEqual(expectedResult.minutes);
    expect(timer.seconds).toEqual(expectedResult.seconds);
  });

  it('should return 30s 500ms time object for 30500 ms', () => {
    const timer = new Time(30500);
    const expectedResult = {
        hours: 0,
        minutes: 0,
        seconds: 30,
        milliseconds: 500
    };

    expect(timer.getViewModel()).toEqual(expectedResult);
    expect(timer.getViewModel()).toEqual(expectedResult);
    expect(timer.hours).toEqual(expectedResult.hours);
    expect(timer.minutes).toEqual(expectedResult.minutes);
    expect(timer.seconds).toEqual(expectedResult.seconds);
  });
});
