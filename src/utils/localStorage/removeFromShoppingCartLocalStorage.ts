// export function removeFromShoppingCartLocalStorage(itemToRemove: any) {
//   console.log("itemToRemove", itemToRemove);

//   const cartKey = "Cart";

//   // Retrieve existing cart from localStorage or create a new one
//   const existingCartJSON = localStorage.getItem(cartKey) || "[]";
//   console.log("existingCartJSON", existingCartJSON);

//   const existingCart = JSON.parse(existingCartJSON);

//   // Find the index of the first matching item
//   const indexOfItemToRemove = existingCart.findIndex((item: any) => {
//     // Compare individual key-value pairs
//     return Object.keys(item).every((key) => {
//       return item[key] === itemToRemove[key];
//     });
//   });

//   console.log("indexOfItemToRemove", indexOfItemToRemove);

//   // If a matching item is found, remove it from the array
//   if (indexOfItemToRemove !== -1) {
//     existingCart.splice(indexOfItemToRemove, 1);
//   }

//   // Save the updated cart to localStorage
//   localStorage.setItem(cartKey, JSON.stringify(existingCart));

//   console.log("existingCart", existingCart);

//   return existingCart;
// }

export function removeFromShoppingCartLocalStorage(itemToRemove: any) {
  console.log("itemToRemove", itemToRemove);

  const cartKey = "Cart";

  // Retrieve existing cart from localStorage or create a new one
  const existingCartJSON = localStorage.getItem(cartKey) || "[]";
  console.log("existingCartJSON", existingCartJSON);

  const existingCart = JSON.parse(existingCartJSON);

  // Find the index of the first matching item
  const indexOfItemToRemove = existingCart.findIndex((item: any) => {
    // Compare individual key-value pairs (excluding curQuantityInCart)
    return Object.keys(item).every((key) => {
      // return key === "curQuantityInCart" || item[key] === itemToRemove[key];
      return key === "Quantity" || item[key] === itemToRemove[key];

    });
  });

  console.log("indexOfItemToRemove", indexOfItemToRemove);

  // If a matching item is found, remove it from the array
  if (indexOfItemToRemove !== -1) {
    existingCart.splice(indexOfItemToRemove, 1);
  }

  // Save the updated cart to localStorage
  localStorage.setItem(cartKey, JSON.stringify(existingCart));

  console.log("existingCart", existingCart);

  return existingCart;
}
