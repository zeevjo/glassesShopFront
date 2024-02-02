import { Item } from "interfaces";
import {
  addItemToShoppingCartLocalStorage,
  getShoppingCartLocalStorage,
} from "./localStorage";
import { getCookie } from "./cookies";
import { customfetch } from "api";
import  {baseUrl}  from "../constants";

export async function addToCart(item: Item, logedIn: boolean) {
  console.log("in addToCart", item);

  // add item to ls
  if (item) {
    addItemToShoppingCartLocalStorage(item);
    const shoppingCartLocalStoage = getShoppingCartLocalStorage();
    console.log("shoppingCartLs in addToCart", shoppingCartLocalStoage);
  }

  // if loged in add to db
  if (logedIn) {
    const addItemToCartUrl = `${baseUrl.loaclhost}/cart/addItemToCart/Glasses/${item?.glassID}`;
    const cookieJwtToken = getCookie("cookieJwtToken");
    console.log("cookieJwtToken", cookieJwtToken);

    try {
      let response: Item[] = await customfetch({
        url: addItemToCartUrl,
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieJwtToken}`,
        },
      });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  }

  // update data "curQuantityInCart"
  // if (item.curQuantityInCart) {
  //   item.curQuantityInCart = item.curQuantityInCart + 1;
  // }

  console.log("trtrtr", item);

  return item;
}
