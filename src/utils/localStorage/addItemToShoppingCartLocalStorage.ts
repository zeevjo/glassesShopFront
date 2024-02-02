import { getShoppingCartLocalStorage } from "./getShoppingCartLocalStorage";

export function addItemToShoppingCartLocalStorage(cartItem: any) {
  console.log("im here");

  const cartKey = "Cart";

  // Retrieve existing cart from localStorage or create a new one
  const existingCartJSON = localStorage.getItem(cartKey) || "[]";
  const existingCart: any[] = JSON.parse(existingCartJSON);
  console.log("existingCart", existingCart);

  // Add the new item to the cart
  existingCart.push(cartItem);
  console.log("existingCart.push", existingCart);

  // Save the updated cart to localStorage
  localStorage.setItem(cartKey, JSON.stringify(existingCart));

  // Optional: You can set an expiration date for the data in localStorage if needed
  // const expirationDate = new Date();
  // expirationDate.setDate(expirationDate.getDate() + 10);
  // localStorage.setItem(cartKey, JSON.stringify(existingCart), expirationDate);

  let x = getShoppingCartLocalStorage();
  console.log("testtes", x);
}
