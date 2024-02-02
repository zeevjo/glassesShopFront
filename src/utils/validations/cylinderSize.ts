export function cylinderSize(input: number): boolean {
  const minValue = 0.25;
  const maxValue = 15;

  // Check if the number is within the specified range
  if (input < minValue || input > maxValue) {
    return false;
  }

  // Check if the number is in jumps of 0.25
  const step = 0.25;
  return (input - minValue) % step === 0;
}