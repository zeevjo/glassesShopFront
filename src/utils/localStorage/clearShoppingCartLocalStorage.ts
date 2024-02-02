export function clearShoppingCartLocalStorage() {
  const cartKey = "Cart";
  
  // Remove the shopping cart data from localStorage
  localStorage.removeItem(cartKey);

  // console.log("Shopping cart data cleared from localStorage");
}
