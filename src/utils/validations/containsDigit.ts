export function containsDigit(input: string): boolean {
  const regex = /\d/; // Regular expression to match a digit
  return regex.test(input);
}