export function getShoppingCartLocalStorage() {
  const cartKey = "Cart";
  const existingCartJSON = localStorage.getItem(cartKey) || "[]";

  //console.log("getShoppingCartLocalStorage", JSON.parse(existingCartJSON));
  
  return JSON.parse(existingCartJSON);
}