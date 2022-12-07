import { numberToString } from './numberToString';

describe('numberToString', function () {
  it('should convert 100 to "10" for 00 format', () => {
    expect(numberToString(100, '00')).toEqual('10');
  });

  it('should convert 830 to "83" for 00 format', () => {
    expect(numberToString(830, '00')).toEqual('83');
  });
});
