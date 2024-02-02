import { Item, shopItem } from "interfaces";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { HiPlusSm } from "react-icons/hi";

import "./itemcard.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { logInStore } from "contexts";
import { customfetch } from "api";
import { addToCart } from "utils";
import { use } from "i18next";
import { useTime } from "hooks";
import { baseUrl } from "../../constants";

interface ItemCardProps {
  modelName: string;
  items: Item[];
  colors: { Color_Name: string; GalleryValue: string }[];
  dataCategory: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  modelName,
  items,
  colors,
  dataCategory,
}) => {
  // console.log("items", items);
  const {
    logedIn,
    dashBordShopIsActive,
    setDashBordShopIsActive,
    setRenderOnOreder,
    renderOnOreder,
  } = useContext(logInStore);

  const [t, i18n] = useTranslation("global");

  const [randomRating, setRandomRating] = useState(0);

  const [data, setData] = useState<Item[]>([]);

  const currentLanguage = i18n.language;

  const uniqueColors = Array.from(new Set(items.map((item) => item.Color)));

  const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);
  // console.log("selectedColorselectedColor", selectedColor);

  //curr color of imeg in dispaly
  const [selectedDisplayColor, setSelectedDisplayColor] = useState<string>(
    uniqueColors[0] || " "
  );

  // console.log(selectedDisplayColor);

  useEffect(() => {
    // Update selectedColor when dataCategory changes
    setSelectedColor(
      items.find((item) => item.Color === uniqueColors[0])?.Color || ""
    );
  }, [dataCategory, items, uniqueColors]);

  useEffect(() => {
    setSelectedImage(
      items.find((item) => item.Color === uniqueColors[0])?.EyeglassImage
    );
    setRandomRating(Math.floor(Math.random() * 5) + 1);
  }, [dataCategory]);

  useEffect(() => {
    const uniqueItems = getUniqueItemsByColor(items);
    setData(uniqueItems);
    // setData(items);

    if (dashBordShopIsActive) {
      // return () => {
      //   setRenderOnOreder(!renderOnOreder);
      // };
    }
  }, []);
  const [selectedImage, setSelectedImage] = useState(
    items.find((item) => item.Color === uniqueColors[0])?.EyeglassImage
  );

  const [selectedPrice, setSelectedCPrice] = useState(
    items.find((item) => item.Color === uniqueColors[0])?.Price
  );

  const [selectedQuantity, setSelectedCQuantity] = useState(
    items.find((item) => item.Color === uniqueColors[0])?.Quantity
  );

  const [selectedId, setSelectedCId] = useState(
    items.find((item) => item.Color === uniqueColors[0])?.glassID
  );
  // console.log("selectedDisplayColor", selectedDisplayColor);

  const handleColorClick = (
    color: string,
    image: string,
    price: number,
    Quantity: number,
    glassID: number,
    curQuantityInCart?: number
  ) => {
    setSelectedColor(color);
    setSelectedImage(image);
    setSelectedDisplayColor(color);
    setSelectedCPrice(price);
    setSelectedCQuantity(Quantity);
    setSelectedCId(glassID);
    console.log("curQuantityInCart1222", Quantity, color);

    let index = data.findIndex((item) => item.Color === color);
    setCurrentItemIndex(index);

    console.log("dashBordShopIsActive", dashBordShopIsActive);
  };

  const itemsPerPage = 4;
  const shouldShowArrows = uniqueColors.length > itemsPerPage; // Check if there are more than 4 colors
  const [startIndex, setStartIndex] = useState(0);

  const handlePreviousColors = () => {
    if (shouldShowArrows && startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNextColors = () => {
    if (shouldShowArrows && startIndex < uniqueColors.length - itemsPerPage) {
      setStartIndex(startIndex + 1);
    }
  };

  const displayedColors = uniqueColors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  async function handleAddToCart() {
    console.log("selectedDisplayColor", selectedDisplayColor);
    const selectedItem = data.find(
      (item) => item.Color === selectedDisplayColor
    );

    if (selectedItem) {
      await addToCart(selectedItem, logedIn);

      console.log("selectedItemwqdwd", selectedItem);
    }
  }
  ////////////////////////////////////////////////////////////////////
  const [currentItemIndex, setCurrentItemIndex] = useState(0); // New state for tracking the current item index

  // Rest of your state declarations...

  useEffect(() => {
    //Update state based on the new currentItemIndex

    if (data[currentItemIndex] != undefined) {
      const currentItem = data[currentItemIndex];
      setSelectedColor(currentItem?.Color || "");
      setSelectedImage(currentItem?.EyeglassImage);
      setSelectedCPrice(currentItem?.Price);
      setSelectedCQuantity(currentItem?.Quantity);
      setSelectedCId(currentItem?.glassID);
      setRandomRating(Math.floor(Math.random() * 5) + 1);
    }
  }, [currentItemIndex, data]);

  // Rest of your useEffects...

  const handleNextItem = () => {
    console.log("selectedDisplayColor", selectedDisplayColor);

    // if (currentItemIndex < items.length - 1) {
    //   setCurrentItemIndex(currentItemIndex + 1);
    // }

    // const newIndex = currentItemIndex + 1;
    // // setCurrentItemIndex(newIndex);
    // console.log("Next Item Color2:", data[newIndex]?.Color);

    // if (data[newIndex] != undefined) {
    //   setSelectedDisplayColor(data[newIndex]?.Color);
    // }

    if (currentItemIndex + 1 >= 0 && currentItemIndex <= items.length) {
      let x = currentItemIndex + 1;
      if (x + 1 >= 0 && x < data.length) {
        setCurrentItemIndex(currentItemIndex + 1);
        const newIndex = currentItemIndex + 1;

        console.log("Next Item Color2:", data[newIndex]?.Color, x);

        if (data[newIndex] != undefined) {
          setSelectedDisplayColor(data[newIndex]?.Color);
        }
      }
    }
    // if (data[newIndex] === undefined) {
    //   setSelectedDisplayColor(data[currentItemIndex -1 ].Color);
    // }
  };

  const handlePreviousItem = () => {
    // if (currentItemIndex > 0) {
    //   setCurrentItemIndex(currentItemIndex - 1);
    // }
    console.log("Next Item Color3:", currentItemIndex - 1);

    if (currentItemIndex - 1 >= -1 && currentItemIndex < items.length) {
      console.log("Next Item Color4:", currentItemIndex - 1);
      let x = currentItemIndex - 1;
      if (x - 1 >= -1 && x <= data.length) {
        setCurrentItemIndex(currentItemIndex - 1);
        const newIndex = currentItemIndex - 1;

        console.log("Next Item Color1:", data[newIndex]?.Color, x);

        if (data[newIndex] != undefined) {
          setSelectedDisplayColor(data[newIndex]?.Color);
        }
      }
    }

    // if (data[newIndex] === undefined) {
    //   setSelectedDisplayColor(data[currentItemIndex].Color);
    // }
  };
  ////////////////////////////////////////////////////////////////

  const incrementItemQuantityAndOrderFromManufacturer = async (
    color: string,
    invntortId: number
  ) => {
    let response = await customfetch({
      url: `${baseUrl.loaclhost}/manufacturer/${invntortId}`,
      method: "GET",
    });

    console.log("response", response);

    const updatedData = data.map((item) => {
      if (item.Color === color) {
        return { ...item, Quantity: item.Quantity + 1 };
      }
      return item;
    });

    setData(updatedData);
  };

  return (
    <div
      className={`item-card-container`}
      style={{ height: dashBordShopIsActive === true ? "418px" : "318px" }}
    >
      <div className="item-img-container">
        {dashBordShopIsActive === false && (
          <div className="content-above-image" onClick={handleAddToCart}>
            <AiOutlineShoppingCart id="cart" />
            <HiPlusSm id="plus" />
          </div>
        )}

        {dashBordShopIsActive === false && (
          <Link
            to={`/shop/${dataCategory}/${modelName}/${selectedDisplayColor}`}
            id="full-item"
          >
            {t("itemcard.fullitem")}
          </Link>
        )}
        <img
          className="item-img"
          src={`${baseUrl.loaclhost}${selectedImage}`}
          alt={modelName}
          loading="lazy"
        />
      </div>
      <h3 id="modelName">{modelName}</h3>
      <h4 id="price">${selectedPrice}</h4>
      <div className="model-rating">
        {Array.from({ length: 5 }).map((_, index) =>
          index < randomRating ? (
            <AiFillStar key={index} className="star-icon-fill-star" />
          ) : (
            <AiOutlineStar key={index} className="star-icon-outline-star" />
          )
        )}
      </div>
      <div className="color-slider-container">
        {
          //shouldShowArrows
          true && (
            <BsChevronLeft
              className={`item-cart-arrow-icon  ${currentLanguage}-arrow`}
              onClick={(e) => {
                e.preventDefault();
                handlePreviousColors();
                handlePreviousItem();
              }}
            />
          )
        }
        <div className="color-options">
          {displayedColors.map((color, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.preventDefault();
                const item = data.find((item) => item.Color === color);
                // setSelectedCQuantity(item?.Quantity);
                if (item) {
                  console.log("item:", item);

                  handleColorClick(
                    item.Color,
                    item.EyeglassImage,
                    item.Price,
                    item.Quantity,
                    item.glassID,
                    item.curQuantityInCart
                  );
                }
              }}
              className={`color-option ${
                // color === selectedColor ? "selected" : ""
                color === selectedDisplayColor ? "selected-color" : ""
              }`}
            >
              {/* Render the color images based on the colors array */}
              <img
                className={`colors  ${
                  color === selectedDisplayColor ? "selected-color-img" : ""
                }`}
                src={`${baseUrl.loaclhost}${
                  colors.find((c) => c.Color_Name === color)?.GalleryValue
                }`}
                alt={color}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {
          //shouldShowArrows
          true && (
            <BsChevronRight
              className={`item-cart-arrow-icon  ${currentLanguage}-arrow`}
              onClick={(e) => {
                e.preventDefault();
                handleNextColors();
                handleNextItem();
              }}
            />
          )
        }
      </div>
      {dashBordShopIsActive && (
        <div id="dashbord-shop-item-data-container">
          <div id="order-from-manufacturer-container">
            <button
              id="order-from-manufacturer-btn"
              onClick={() => {
                const item = data.find(
                  (item) => item.Color === selectedDisplayColor
                );

                if (item?.InventoryProductId != undefined) {
                  incrementItemQuantityAndOrderFromManufacturer(
                    selectedDisplayColor,
                    item?.InventoryProductId
                  );
                }
                if (item?.Quantity != undefined) {
                  setSelectedCQuantity(item?.Quantity + 1);
                }
              }}
            >
              {t(`itemcard.dashbordorderglasess`)}
            </button>
          </div>
          <div id="order-from-selectedQuantity-container">
            <div>{t(`itemcard.dashbordcurrqantity`)}</div>
            <div>{selectedQuantity}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;

const getUniqueItemsByColor = (items: Item[]) => {
  const unique = new Map();
  items.forEach((item) => {
    if (!unique.has(item.Color)) {
      unique.set(item.Color, item);
    }
  });
  return Array.from(unique.values());
};
