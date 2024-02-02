import React, { useContext, useEffect, useState } from "react";
import "./cartitemglasses.css";
import { CartItemGlassesProps } from "interfaces";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  addItemToShoppingCartLocalStorage,
  clearShoppingCartLocalStorage,
  getShoppingCartLocalStorage,
} from "utils";
import { logInStore } from "contexts";
import baseUrl from "constants/test/baseUrl";

//The values ​​of the item depend on whether they come from the database or local storage ||
const CartItemGlasses: React.FC<CartItemGlassesProps> = ({
  item,
  handelAddItem,
  handelRemoveItem,
}) => {
  console.log("CartItemGlasses2", item);

  //const quantityOfItems = item.quantityOfItems ?? 1;

  const [quantityOfItems, setQuantityOfItems] = useState(1);
  const [allowAdd, setAllowAdd] = useState(true);

  const {
    displayCart,
    setDispalyCart,
    logedIn,
    setlogedIn,
    cartStorageChange,
    setCartStorageChange,
  } = useContext(logInStore);



  useEffect(() => {
    //console.log("item.quantityOfItems1", item.quantityOfItems);
    if (item.quantityOfItems != 0 && item.quantityOfItems != undefined) {
      console.log("item.quantityOfItems2", item.quantityOfItems);
      setQuantityOfItems(item.quantityOfItems);
      setAllowAdd(true);
    }
    if (item.quantityOfItems === 1) {
      setAllowAdd(false);
    }
    console.log("b1", item.Quantity, quantityOfItems);
  }, [item.quantityOfItems]);

  console.log("yegyuwegudf", item, allowAdd, item.quantityOfItems);

  const handelPlus = async () => {
    console.log("handelPlus");

    // if (allowAdd) {
    setQuantityOfItems((prevState) => prevState + 1);
    await handelAddItem(item);
    setCartStorageChange(!cartStorageChange);
    // }
  };

  const handelMinus = async () => {


    // if (quantityOfItems >= 1) {

    if (quantityOfItems - 1 != 0) {
      setQuantityOfItems((prevState) => prevState - 1);
    }

    await handelRemoveItem(item);
    setCartStorageChange(!cartStorageChange);

    // const shoppingCartLocalStoage = getShoppingCartLocalStorage();
    // console.log("check77", shoppingCartLocalStoage);
    // }
  };

  return (
    <div id="cart-item-glasses-container">
      <div id="cart-item-glasses-img-container">
        <img
          id="cart-item-glasses-img"
          src={`${baseUrl.loaclhost}${
            item.EyeglassImage || item.GalleryImageURL
          }`}
          alt={`${baseUrl.loaclhost}${item.ModelName || item.ModuleName}`}
        />
      </div>

      <div id="cart-item-glasses-text-container">
        <div id="cart-item-glasses-ModelName">
          {item.ModelName || item.ModuleName}
        </div>

        <div id="cart-item-glasses-Price">${item.Price * quantityOfItems}</div>
        <div>
          <FaMinus onClick={handelMinus} />
          {quantityOfItems}
          <FaPlus onClick={handelPlus} />
        </div>
      </div>
    </div>
  );
};

export default CartItemGlasses;

//TODO: if item was the last and then added to cart
//then remove from cart
//add back to shop
