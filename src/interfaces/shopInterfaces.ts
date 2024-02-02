export interface shopItem {
  ModelName: string;
  Brand: string;
  Category: string;
  Collection: string;
  Color: string;
  glassID: number;
  EyeglassImage: string;
  Price: number;
  Shape: string;
  InventoryProductId: number;
  Quantity: number;
  // Add other properties as needed
}

export interface shopItems  {
  dataItems:shopItem[]
}