export interface LensProps {
  item: {
  cylinder: number;
  lensCoating?: string;
  LensCoating?: string;
  prescriptionStrength: number;
  thickness: number;
  quantityOfItems?: number; 
  }
  handelAddItem: (item: any) => void;
  handelRemoveItem: (item: any) => void;
}