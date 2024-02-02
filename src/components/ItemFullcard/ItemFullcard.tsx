import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopItem } from "interfaces";
import { customfetch } from "api";
import { modelBuilder } from "utils";
import { log } from "console";
import "./itemfullcard.css";
import { useTranslation } from "react-i18next";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import baseUrl from "constants/test/baseUrl";

interface ItemCardProps {
  modelName: string;
  items: {
    EyeglassImage: string;
    Color: string;
    Price: number;
    Quantity: number;
    glassID: number;
  }[];
  colors: { Color_Name: string; GalleryValue: string }[];
  dataCategory: string;
  currItemDispaly: Function;
  selectedDisplayColor: string | undefined;
}

const ItemFullcard: React.FC<ItemCardProps> = ({
  modelName,
  items,
  colors,
  dataCategory,
  currItemDispaly,
  selectedDisplayColor,
}) => {
  // console.log("dataCategory",dataCategory);

  // console.log("selectedDisplayColor", selectedDisplayColor);

  const [t, i18n] = useTranslation("global");

  const currentLanguage = i18n.language;

  const uniqueColors = Array.from(new Set(items.map((item) => item.Color)));

  const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);
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

  const [randomRating, setRandomRating] = useState(0);

  const handleColorClick = (
    color: string,
    image: string,
    price: number,
    Quantity: number,
    glassID: number
  ) => {
    setSelectedColor(color);
    setSelectedImage(image);
    setSelectedCPrice(price);
    setSelectedCQuantity(Quantity);
    setSelectedCId(glassID);

    const selectedItem = items.find((item) => item.Color === color);
    if (selectedItem) {
      currItemDispaly(selectedItem);
    }
  };

  useEffect(() => {
    setRandomRating(Math.floor(Math.random() * 5) + 1);
    // console.log("randomRating", randomRating);
  }, []);

  useEffect(() => {
    setSelectedImage(
      items.find((item) => item.Color === uniqueColors[0])?.EyeglassImage
    );
    setRandomRating(Math.floor(Math.random() * 5) + 1);
  }, [dataCategory]);

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

  useEffect(() => {
    // Set the initial selected item when the component mounts
    currItemDispaly(items.find((item) => item.Color === uniqueColors[0]));
  }, []);

  useEffect(() => {
    setSelectedCQuantity(
      items.find((item) => item.Color === uniqueColors[0])?.Quantity
    );
  }, [dataCategory]);

  useEffect(() => {
    // Check if selectedDisplayColor is defined and exists in the items array
    const initialColor =
      selectedDisplayColor &&
      items.some((item) => item.Color === selectedDisplayColor)
        ? selectedDisplayColor
        : uniqueColors[0];

    setSelectedColor(initialColor);
    setSelectedImage(
      items.find((item) => item.Color === initialColor)?.EyeglassImage || ""
    );

    setSelectedCQuantity(
      items.find((item) => item.Color === initialColor)?.Quantity
    );

    // Call the currItemDispaly function with the initial item
    const initialItem = items.find((item) => item.Color === initialColor);
    if (initialItem) {
      currItemDispaly(initialItem);
    }
  }, []);

  console.log("selectedQuantity", selectedQuantity);
  return (
    <div id="ItemFullcard-container">
      <div className="ItemFullcard-img-container">
        <img className="ItemFullcard-img" src={`${baseUrl.loaclhost}${selectedImage}`} alt={modelName}  loading="lazy" />
      </div>
      <h3 id="ItemFullcard-modelName">{modelName}</h3>
      <h4 id="ItemFullcard-price">${selectedPrice}</h4>
      <div className="ItemFullcard-model-rating">
        {Array.from({ length: 5 }).map((_, index) =>
          index < randomRating ? (
            <AiFillStar
              key={index}
              className="ItemFullcard-star-icon-fill-star"
            />
          ) : (
            <AiOutlineStar
              key={index}
              className="ItemFullcard-star-icon-outline-star"
            />
          )
        )}
      </div>
      <div className="ItemFullcard-color-slider-container">
        
   
      </div>
    </div>
  );
};

export default ItemFullcard;