export function hasSpaces(inputString: string): boolean {
  // Use a regular expression to check for spaces (whitespace)
  const spaceRegex = /\s/;
  return spaceRegex.test(inputString);
}