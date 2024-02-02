import React from "react";
import contactLensses from '../../assets/showcase/contactLensses.png'
import { useTranslation } from "react-i18next";
import './cartitemcontactlenses.css'
import { CartItemContactLensesProps } from "interfaces";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartItemContactLenses: React.FC<CartItemContactLensesProps> = ({
  item,
  handelAddItem,
  handelRemoveItem,
}) => {

  const [t] = useTranslation("global");
  const quantityOfItems = item.quantityOfItems ?? 1;
  const Price = 200;

  return (
    <div id="cart-item-contact-lenses-container">
      <div id="cart-item-contact-lenses-img-container">
        <img
          id="cart-item-contact-lenses-img"
          src={contactLensses}
          alt={item.ExpiryDate}
        />
      </div>

      <div id="cart-item-contact-lenses-text-container">
        <div id="cart-item-contact-lenses-ModelName">{`${item.ExpiryDate} `}{t(`cartitemcontactlenses.name`)}</div>
        <div id="cart-item-contact-lenses-Price">${Price * quantityOfItems}</div>
        <div>
          <FaMinus
            onClick={() => {
              console.log("yoyoy", item);
              handelRemoveItem(item);
            }}
          />
          {quantityOfItems}
          <FaPlus
            onClick={() => {
              handelAddItem(item);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemContactLenses;
