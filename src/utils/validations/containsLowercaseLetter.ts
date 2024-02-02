export function containsLowercaseLetter(input: string): boolean {
  const regex = /[a-z]/; // Regular expression to match a lowercase letter
  return regex.test(input);
}
