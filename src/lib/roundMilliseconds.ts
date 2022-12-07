export function roundMilliseconds(value: number): string {
  const rounded = Math.floor(value / 10);

  if(rounded < 10) {
    return `0${rounded}`
  }

  return `${rounded}`;
}
