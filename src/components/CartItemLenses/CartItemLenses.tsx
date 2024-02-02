import React from 'react'
import Lensses from '../../assets/showcase/glassesLenses-removebg-preview.png'
import './cartitemlenses.css'
import { useTranslation } from 'react-i18next';
import { LensProps } from 'interfaces';
import { FaMinus, FaPlus } from "react-icons/fa";

const CartItemLenses: React.FC<LensProps> = ({
  item,
  handelAddItem,
  handelRemoveItem,
}) => {
  const [t, i18n] = useTranslation("global");
  
  const quantityOfItems = item.quantityOfItems ?? 1;
  console.log("quantityOfItems", quantityOfItems);
  
  const Price = 200;


  console.log("444444",item);
  

  return (
    <div id="cart-item-lenses-container">
      <div id="cart-item-lenses-img-container">
        <img
          id="cart-item-lenses-img"
          src={Lensses}
          alt={item.lensCoating}
        />
      </div>
      <div id="cart-item-lenses-text-container">
        <div id="cart-item-lenses-ModelName">{`${item.lensCoating || item.LensCoating} `}{t(`cartitemlenses.name`)}</div>
        <div id="cart-item-lenses-Price">${Price * quantityOfItems}</div>
        <div>
          <FaMinus
            onClick={() => {
              console.log("yoyoy1", item);
              
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
  )
}

export default CartItemLenses