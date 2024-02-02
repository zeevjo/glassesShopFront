import { ItemCard } from "components";
import { logInStore } from "contexts";
import { shopItem, userRoleInterface } from "interfaces";
import React, { useContext, useEffect, useState } from "react";
import { getCookie, modelBuilder } from "utils";
import "./frontviewmodels.css";
import { useScreenSize } from "hooks";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const FrontViewModels = () => {
  const [t, i18n] = useTranslation("global");
  const cookieJwtToken = getCookie("cookieJwtToken");

  if (cookieJwtToken) {
    const decodedToken = jwtDecode(cookieJwtToken);
    // console.log("%c decodedToken", "color: red", decodedToken);
  }

  const { eyeGlassesData, colorData, setDashBordShopIsActive } = useContext(logInStore);

  const [data, setData] = useState<shopItem[]>();
  
  const [cardCount, setCardCount] = useState(1); // Number of cards to display
  const [displayedCards, setDisplayedCards] = useState<JSX.Element[]>([]);
  useEffect(() => {
    setData(eyeGlassesData);
    setDashBordShopIsActive(false);
  }, []);

  useEffect(() => {
    let RandomModels;
    if (data != undefined) {
      RandomModels = getRandomModels(data, cardCount);

      console.log("getRandomModels", RandomModels);

      dataCategory = "Eyeglasses";
      modelObj = modelBuilder(RandomModels);

      const itemCards = Object.entries(modelObj).map(([modelName, items]) => (
        <ItemCard
          key={modelName}
          modelName={modelName}
          items={items}
          colors={colorData}
          dataCategory={dataCategory}
        />
      ));

      setDisplayedCards(itemCards.slice(0, cardCount));
    }
  }, [eyeGlassesData, cardCount]);

  let screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize.width >= 320) {
      setCardCount(1);
    }
    if (screenSize.width >= 700) {
      setCardCount(2);
    }
    if (screenSize.width >= 900) {
      setCardCount(3);
    }
    if (screenSize.width >= 1400) {
      setCardCount(4);
    }
    if (screenSize.width >= 1500) {
      setCardCount(5);
    }
  }, [screenSize.width]);

  function getRandomModels(arr1: shopItem[], count: number): shopItem[] {

    if (!Array.isArray(arr1)) {
      console.error('getRandomModels: arr1 is not an array');
      return [];
    }
    
    const uniqueModels: Set<string> = new Set();
    const modelsMap: Map<string, shopItem[]> = new Map();

    // Group items by ModelName
    arr1.forEach((item) => {
      const modelName = item.ModelName;
      if (!uniqueModels.has(modelName)) {
        uniqueModels.add(modelName);
        modelsMap.set(modelName, []);
      }
      modelsMap.get(modelName)?.push(item);
    });

    const selectedModels: string[] = [];
    const result: shopItem[] = [];

    while (selectedModels.length < 5 && uniqueModels.size > 0) {
      const allModels = Array.from(uniqueModels);
      const randomIndex = Math.floor(Math.random() * allModels.length);
      const selectedModel = allModels[randomIndex];

      if (!selectedModels.includes(selectedModel)) {
        selectedModels.push(selectedModel);
        result.push(...(modelsMap.get(selectedModel) || []));
      }

      uniqueModels.delete(selectedModel);
    }

    return result;
  }

  let dataCategory: string;
  let modelObj;
  // let displayedCards;


  return (
    <div id="front-view-models-contanier">
      {cardCount != 4 && cardCount != 5 && (
        <h3 id="front-view-models-title">{t(`FrontViewModels.title`)}</h3>
      )}
      {cardCount === 4 && (
        <h2 id="front-view-models-title">{t(`FrontViewModels.title`)}</h2>
      )}
      {cardCount === 5 && (
        <h1 id="front-view-models-title">{t(`FrontViewModels.title`)}</h1>
      )}
      <div id="front-view-models-displayedCards-contanier">
        {displayedCards}
      </div>
    </div>
  );
};

export default FrontViewModels;
