export function containsSpecialCharacter(input: string): boolean {
  const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/; // Regular expression to match special characters
  return regex.test(input);
}

// The regular expression  [!@#$%^&*()_+{}\[\]:;<>,.?~\\-] checks for the following special characters:

// !
// @
// #
// $
// %
// ^
// &
// *
// ()
// _
// +
// {
// }
// [
// ]
// :
// ;
// <
// >
// ,
// .
// ?
// ~
// \\ (backslash)
// -