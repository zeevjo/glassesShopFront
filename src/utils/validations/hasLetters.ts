export function hasLetters(inputString: string): boolean {
  // Define a regular expression pattern to match letters (uppercase or lowercase)
  const lettersPattern = /[a-zA-Z]/;

  // Use the test method to check if the input string contains at least one letter
  return lettersPattern.test(inputString);
}