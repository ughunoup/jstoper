import { roundMilliseconds } from './roundMilliseconds';

describe('roundMilliseconds', () => {

  it.each([
    {expected: '01', value: 10},
    {expected: '10', value: 100},
    {expected: '99', value: 999},
  ])('should return %i for %i', ({expected, value}) => {
    expect(roundMilliseconds(value)).toEqual(expected);
  });
});
