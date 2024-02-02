export function isAtLeast8Characters(input: string): boolean {
  const regex = /^.{8,}$/;
  return regex.test(input);
}

export function isAtLeast4Characters(input: string): boolean {
  const regex = /^.{4,}$/;
  return regex.test(input);
}