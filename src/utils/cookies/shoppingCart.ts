import { log } from "console";
import { getShoppingCartCookie } from "./getShoppingCart";
import { Await } from "react-router-dom";

export function addItemToShoppingCartCookie(cartItem: any) {
  console.log("im here");
  
  const cartKey = "Cart";

  // Retrieve existing cart from the cookie or create a new one
  const existingCartCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cartKey}=`));


    // console.log("existingCartCookie", existingCartCookie);
    
  const existingCartJSON = existingCartCookie
    ? decodeURIComponent(existingCartCookie.split("=")[1])
    : "[]";



  const existingCart: any[] = JSON.parse(existingCartJSON);
 console.log("existingCart", existingCart);
 
  // Add the new item to the cart
  existingCart.push(cartItem);


  console.log("existingCart.push", existingCart);
  
  // Save the updated cart to the cookie (expires in 10 days)
  const updatedCartJSON = JSON.stringify(existingCart);
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 10);

  document.cookie = `${cartKey}=${encodeURIComponent(
    updatedCartJSON
  )}; expires=${expirationDate.toUTCString()}; path=/`;

 let x =  getShoppingCartCookie()
 console.log("testtes", x);
 
};