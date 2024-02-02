import { shopItem } from "interfaces";

export function modelBuilder(items: shopItem[]) {
  console.log("items:",items);
  
  const result: { [key: string]: shopItem[] } = {};

  for (const item of items) {
    const modelName = item.ModelName;
    if (!result[modelName]) {
      result[modelName] = [];
    }
    result[modelName].push(item);
  }

  return result;
}