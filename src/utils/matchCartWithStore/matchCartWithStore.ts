import { Item } from "interfaces";
import { getShoppingCartLocalStorage } from "utils/localStorage";

type Product = {
  Brand: string;
  Category: string;
  Collection: string;
  Color: string;
  EyeglassImage: string;
  InventoryProductId: number;
  ModelName: string;
  Price: number;
  Quantity: number;
  Shape: string;
  glassID: number;
};

type MismatchResult = {
  indexOfnotMachingObj: number;
  howmuchnotMaching: number;
};

function compareQuantities(stockQuantities: number[], products: Product[]): MismatchResult[] {
  const mismatches: MismatchResult[] = [];

  products.forEach((product, index) => {
    const expectedQuantity = stockQuantities[index];
    const quantityMismatch = product.Quantity - expectedQuantity;

    if (quantityMismatch !== 0) {
      mismatches.push({
        indexOfnotMachingObj: index,
        howmuchnotMaching: Math.abs(quantityMismatch)
      });
    }
  });

  return mismatches;
}

type Result = {
  indexOfObjThatIsInCart: number;
  howMuchInCart: number;
};

type Product2 = {
  Brand: string;
  Category: string;
  Collection: string;
  Color: string;
  EyeglassImage: string;
  InventoryProductId: number;
  ModelName: string;
  Price: number;
  Quantity?: number;
  Shape: string;
  glassID: number;
};

function compareProducts(inventoryArray: Product2[], cartArray: Product2[]): Result[] {
  const resultArray: Result[] = [];

  inventoryArray.forEach((inventoryItem, index) => {
    let countInCart = 0;

    cartArray.forEach((cartItem) => {
      const isMatch = Object.keys(inventoryItem).every((key) => {
        if (key === 'Quantity') return true; // Skip Quantity field
        return inventoryItem[key as keyof Product] === cartItem[key as keyof Product];
      });

      if (isMatch) {
        countInCart++;
      }
    });

    if (countInCart > 0) {
      resultArray.push({
        indexOfObjThatIsInCart: index,
        howMuchInCart: countInCart
      });
    }
  });

  return resultArray;
}


// const result = compareQuantities(arrayOfNum, arrayOfObj);
// console.log(result);


export function matchCartWithStore (storeData:Item[]){
/**
 * campere between store Quantity array and data (curr array in store) array.
 * to find a missmatch between the Quantitys
 */
//const mismachArray = compareQuantities(cart, quantityArray);
const shoppingCartLocalStoage = getShoppingCartLocalStorage();

//if there is a missmatch
// if (mismachArray.length > 0) {
  // }


  /**
   * find how much are missing in store from cart
   */
  const resultArray = compareProducts(storeData, shoppingCartLocalStoage);



  console.log("resultArray", resultArray, storeData);
  
return resultArray
}