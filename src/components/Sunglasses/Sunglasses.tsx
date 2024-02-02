import { useContext, useEffect, useState } from "react";
import { logInStore } from "contexts";
import { ItemCard } from "components";
import { shopItem } from "interfaces";
import { modelBuilder } from "utils";

const Sunglasses = () => {
  interface sunGlasses {
    Brand: string;
    Category: string;
    Collection: string;
    Color: string;
    EyeglassImage: string;
    InventoryProductId: number;
    ModelName: string;
    Price: number;
    Quantity: number;
    Shape: string;
    glassID: number;
  }
  const { sunGlassesData, colorData, apiUpdate, selectedColorsForFilter } =
    useContext(logInStore);

  const [currDataType, setCurrDataType] = useState<shopItem[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [dataCategory, setDatacategory] = useState("");
  const [imFiltering, setImFiltering] = useState(false);

  useEffect(() => {
    setCurrDataType(sunGlassesData);
    setDatacategory("Sunglasses");
    setColors(colorData);
  }, [apiUpdate, sunGlassesData, colorData]);

  /**
   * update ui with relavente items base on the color filter
   */
  useEffect(() => {
    if (selectedColorsForFilter.length !== 0) {
      setImFiltering(true);
      const filterEyeglassesByColor = (
        eyeglassesData: sunGlasses[],
        colorOptions: string[]
      ): sunGlasses[] => {
        return eyeglassesData.filter((eyeglass) =>
          colorOptions.includes(eyeglass.Color)
        );
      };

      let filterEyeglasses = filterEyeglassesByColor(
        sunGlassesData,
        selectedColorsForFilter
      );

      console.log("filterEyeglasses", filterEyeglasses);

      setCurrDataType(filterEyeglasses);
      setDatacategory("Sunglasses");
    } else {
      setCurrDataType(sunGlassesData);
      setDatacategory("Sunglasses");
    }
  }, [selectedColorsForFilter, sunGlassesData]);

  let itemCards = null;

  console.log("selectedColorsForFilter", selectedColorsForFilter);
  console.log("currDataType", currDataType);

  let modelObj = modelBuilder(currDataType);

  if (selectedColorsForFilter.length === 0 || imFiltering) {
    itemCards = Object.entries(modelObj).map(([modelName, items]) => (
      <ItemCard
        key={modelName}
        modelName={modelName}
        items={items}
        colors={colors}
        dataCategory={dataCategory}
      />
    ));
  }

  return <div id="itemCards-container">{itemCards}</div>;
};

export default Sunglasses;
