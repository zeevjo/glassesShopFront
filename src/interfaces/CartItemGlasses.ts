export interface CartItemGlassesProps {
  item: {
    Brand: string;
    Category: string;
    Collection: string;
    Color: string;
    EyeglassImage?: string;
    GalleryImageURL?: string;
    InventoryProductId: number;
    ModelName?: string;
    ModuleName?: string;
    Price: number;
    Quantity: number;
    Shape: string;
    glassID: number;
    quantityOfItems?: number; 
  };
  handelAddItem: (item: any) => void;
  handelRemoveItem: (item: any) => void;
}