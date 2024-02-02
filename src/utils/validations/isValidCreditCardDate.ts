export function isValidCreditCardDate(cardDate: string): boolean {
  const currentDate = new Date(); // Get the current date
  const [month, year] = cardDate.match(/\d{2}/g) || []; // Extract month and year from the input string

  if (!month || !year) {
    return false; // Invalid input format
  }

  const inputDate = new Date(
    parseInt(`20${year}`, 10),
    parseInt(month, 10) - 1,
    1
  ); // Create a date from input year and month

  // Compare the input date with the current date
  return inputDate > currentDate;
}
