export function calculateTotalAmount(items: any[]): number {
  let totalAmount = 0;

  for (const item of items) {
    if (item && typeof item === "object") {
      if ("Price" in item) {
        totalAmount += item.Price;
      } else {
        totalAmount += 200;
      }
    } else {
      // If the item is not an object or is null/undefined, add 200
      totalAmount += 200;
    }
  }

  return totalAmount;
}
