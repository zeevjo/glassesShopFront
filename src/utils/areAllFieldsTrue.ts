type BooleanObject = {
  [key: string]: boolean;
};

export function areAllFieldsTrue(obj: BooleanObject): boolean {
  return Object.values(obj).every((value) => value === true);
}
