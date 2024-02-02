export function hasNoNumbers(inputString: string): boolean {
  // Regular expression to match any digit (0-9) in the string
  const digitRegex = /\d/;

  // Use the test() method to check if the inputString contains any digits
  return !digitRegex.test(inputString);
}