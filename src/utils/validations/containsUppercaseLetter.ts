export function containsUppercaseLetter(input: string): boolean {
  const regex = /[A-Z]/; // Regular expression to match an uppercase letter
  return regex.test(input);
}