export function glassesSizeNumber(fieldValue: number): boolean {
  // Check if the number is not equal to 0
  // console.log(fieldValue);
  
  
  if (fieldValue === 0) {
    // console.log("fieldValue");
    return false;
  }

  // Check if the number is within the range [-15, 15]
  if (fieldValue >= -15 && fieldValue <= 15) {
    // Check if the number is in increments of a quarter
    const isQuarterIncrement = Math.abs(fieldValue * 4) % 1 === 0;
    return isQuarterIncrement;
  }

  return false;
}