import React, { useContext, useEffect, useState } from "react";
import "./itemfulldetailes.css";
import { useNavigate, useParams } from "react-router-dom";
import { shopItem } from "interfaces";
import { customfetch } from "api";
import ItemCard from "components/ItemCard";
import {
  addItemToCartInDb,
  addItemToShoppingCartCookie,
  addItemToShoppingCartLocalStorage,
  getShoppingCartLocalStorage,
  modelBuilder,
} from "utils";
import { log } from "console";
import ItemFullcard from "components/ItemFullcard";
import { useTranslation } from "react-i18next";
import { logInStore } from "contexts";
import { baseUrl } from "../../constants";

const ItemFullDetailes = () => {
  const { dataCategory, modelName, selectedDisplayColor } = useParams();
  const navigate = useNavigate();

  // console.log("im the product id", modelName);
  const [t, i18n] = useTranslation("global");

  // console.log("dataCategory", modelName , dataCategory);
  const { cartArray, setCartArray, logedIn } = useContext(logInStore);
  const [currDataType, setCurrDataType] = useState<shopItem[]>([]);
  const [colors, setColors] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // const [dataCategory, setDatacategory] = useState("");

  // let url: string = `${baseUrl.loaclhost}/shop/getAllItemsByModuleName/${modelName}`;
  let url: string = `${baseUrl.loaclhost}/shop/getAllItemsByModuleNameAndCategory/${dataCategory}/${modelName}`;

  useEffect(() => {
    (async () => {
      try {
        let response: shopItem[] = await customfetch({
          url: url,
          method: "GET",
        });
        setCurrDataType(response);
        // setDatacategory(response[0].Category)
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let response: [] = await customfetch({
          url: `${baseUrl.loaclhost}/Color/getAllColors`,
          method: "GET",
        });
        setColors(response);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  // console.log("currDataType", currDataType);

  const modelObj = modelBuilder(currDataType);
  // console.log("modelObj", modelObj);

  let fullItemCard = Object.entries(modelObj).map(([modelName, items]) => (
    <ItemFullcard
      key={modelName}
      modelName={modelName}
      items={items}
      colors={colors}
      dataCategory={dataCategory!}
      selectedDisplayColor={selectedDisplayColor}
      currItemDispaly={(item: React.SetStateAction<shopItem | null>) =>
        setSelectedItem(item)
      }
    />
  ));

  // console.log("itemCards", fullItemCard);

  let randomNum = Math.floor(Math.random() * 5) + 1;

  const handelAddToCart = async (item: any) => {
    console.log("selectedItem12345", cartArray,  cartArray[cartArray.length - 1]);

    setCartArray((prevCartArray: any) => [...prevCartArray, selectedItem]);

    addItemToShoppingCartLocalStorage(selectedItem);
    const shoppingCartLocalStoage = getShoppingCartLocalStorage();
    console.log("selectedItem12345", shoppingCartLocalStoage,  shoppingCartLocalStoage[shoppingCartLocalStoage.length - 1]);
    if (logedIn) {
      //add Glasses Item
      let picktItem = shoppingCartLocalStoage[shoppingCartLocalStoage.length - 1];
      if (picktItem.EyeglassImage || picktItem.GalleryImageURL) {
        console.log("picktItem", picktItem);
        
        await addItemToCartInDb(picktItem);
      }
    }
  };
  return (
    <div id="ItemFullDetailes-container">
      <div id="Design-ItemFullcard-container">
        {fullItemCard}

        <div id="ItemFullDetailes-Product-Description-btns">
          <div id="Productdescription">
            <div id="test123">
              {t(`ItemFullcard.Productdescription${randomNum}`)}
            </div>
          </div>

          <button
            className="ItemFullcard-btns"
            onClick={() => navigate("/shop/lenses")}
          >
            {t(`ItemFullcard.chooselens`)}
          </button>

          <button
            className="ItemFullcard-btns"
            onClick={() => {
              handelAddToCart(fullItemCard);
            }}
          >
            {t(`ItemFullcard.addtocart`)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemFullDetailes;
