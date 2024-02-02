import { logInStore } from "contexts";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./filter.css";
import { shopItem } from "interfaces";
import { filterColorsByItems } from "utils";
import { IoMdClose } from "react-icons/io";
import  {baseUrl}  from "../../constants";


const Filter = () => {
  const {
    displayDispalyFilter,
    setDisplayDispalyFilter,
    colorData,
    selectedColorsForFilter,
    setSelectedColorsForFilter,
    eyeGlassesData,
    sunGlassesData,
    
  } = useContext(logInStore);
  const {
    i18n: { language },
  } = useTranslation();

  const [t] = useTranslation("global");

  interface ColorInfo {
    Color_Name: string;
    GalleryValue: string;
  }

  const handelColorItemClick = (colorObj: ColorInfo) => {
    const index = selectedColorsForFilter.indexOf(colorObj.Color_Name);
    if (index === -1) {
      // Color not in the array, add it
      console.log("selectedColorsForFilter1", selectedColorsForFilter);

      setSelectedColorsForFilter([
        ...selectedColorsForFilter,
        colorObj.Color_Name,
      ]);
    } else {
      // Color exists in the array, remove it
      const updatedColors = [...selectedColorsForFilter];
      console.log("selectedColorsForFilter2", selectedColorsForFilter);
      
      updatedColors.splice(index, 1);
      setSelectedColorsForFilter(updatedColors);
    }
  };

  const resetFilter = () => {
    console.log("selectedColorsForFilter3", selectedColorsForFilter);
    setSelectedColorsForFilter([]);
  } 

  const currentURL = window.location.href; // This gets the full URL

  interface Color {
    Color_Name: string;
    GalleryValue: string;
  }

  let test: Color[] = [];
  if (currentURL.includes("/shop/Eyeglasses")) {
    test = filterColorsByItems(eyeGlassesData, colorData);
  }
  //TODO:: THAT IT SHOULD NOT be 
  //  else if (currentURL === "http://localhost:3000/shop") {
    else if (currentURL.endsWith("shop")) {
    test = filterColorsByItems(eyeGlassesData, colorData);
  } else if (currentURL.includes("/shop/Sunglasses")) {
    test = filterColorsByItems(sunGlassesData, colorData);
  } else if (currentURL.includes("/dashboard/dashbordShop/Eyeglasses")){
    test = filterColorsByItems(eyeGlassesData, colorData);
  }else if (currentURL.includes("/dashboard/dashbordShop/Sunglasses")){
    test = filterColorsByItems(sunGlassesData, colorData);
  }

  const colorItems = test
    .filter((colorObj: Color) => colorObj.Color_Name !== "erorr")
    .map((colorObj: Color) => (
      <div className={`color-item-container yourScrollableDivContent`} key={colorObj.GalleryValue}>
        <img
          className={`color-item-img ${
            selectedColorsForFilter.includes(colorObj.Color_Name)
              ? "selected-color" // Apply border styles for selected colors
              : ""
          }`}
          src={`${baseUrl.loaclhost}${colorObj.GalleryValue}`}
          alt={colorObj.Color_Name}
          onClick={() => handelColorItemClick(colorObj)}
        />
        {/* <div className="color-item-name">{colorObj.Color_Name}</div> */}
      </div>
    ));

  return (
    <div
      className={`filter-container-${language}${
        displayDispalyFilter ? ` filter-active-${language}` : ""
      }`}
    >
      <IoMdClose
        id={`colse-filter-${language}`}
        onClick={() => {
          setDisplayDispalyFilter(false);
        }}
      ></IoMdClose>
      <div id="select-color-item-title">{t(`filter.selectColor`)}</div>
      <div
        id="color-items-container"
      >
        {colorItems}
      </div>
      <button id="filter-reset-btn" onClick={resetFilter}>{t('filter.reset')}</button>
    </div>
  );
};

export default Filter;
