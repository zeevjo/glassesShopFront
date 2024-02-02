// export interface CartItemContactLensesProps {
//   item: {
//     ExpiryDate: string;
//     cylinder: number;
//     prescriptionStrength: number;
//   };
// }

export interface CartItemContactLensesProps {
  item: {
    ExpiryDate: string;
    cylinder: number;
    prescriptionStrength: number;
    quantityOfItems?: number; 
  };
  handelAddItem: (item: any) => void;
  handelRemoveItem: (item: any) => void;
}
