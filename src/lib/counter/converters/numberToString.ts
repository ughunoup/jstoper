import type { FormatOption } from '../model/Time';

export function numberToString(value: number, format: FormatOption): string {
  const valueString = `${value}`;
  if(valueString.length > format.length) {
    return format.split('').map((c, index) => {
      return valueString.split('')[index];
    }).join('');
  } else {
    return format.substring(0, format.length - valueString.length) + valueString;
  }
}
