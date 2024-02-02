import React, { useContext, useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray, useWatch, FieldError } from "react-hook-form";
import {
  addItemToShoppingCartCookie,
  addItemToShoppingCartLocalStorage,
  cylinderSize,
  getCookie,
  glassesSizeNumber,
  isFieldValid,
} from "utils";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { customfetch } from "api";
import "./lenses.css";

import "./lenses.css";
import { Interface } from "readline";
import { logInStore } from "contexts";
import  {baseUrl}  from "../../constants";

type lenssesType = {
  prescriptionStrength: number;
  lensCoating: string;
  thickness: number;
  cylinder: number;
};

const Lenses = () => {
  const form = useForm<lenssesType>({ mode: "all" });
  const [t, i18n] = useTranslation("global");
  const { logedIn, setlogedIn } = useContext(logInStore);

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    getFieldState,
  } = form;

  const watchedFieldValue = useWatch({
    control, // Provide the control instance from useForm
    name: "prescriptionStrength", // Replace with the name of the field you want to watch
  });

  // console.log(watchedFieldValue);
  const { cartArray, setCartArray } = useContext(logInStore);
  const { errors } = formState;

  const onSubmit = async (data: lenssesType) => {
    //send data to the API

    console.log("logedIn", logedIn);

    type lensessType = {
      Brand_Id: number;
      Cylinder_Id: number;
      Id: number;
      Image: number;
      Lens_Coating_id: number;
      Prescription_Strength_Id: number;
      Price: number;
      Thickness_Id: number;
    };

    if (logedIn) {
      const addItemToCartUrl = `${baseUrl.loaclhost}/shop/GetLensesByDetails`;
      const cookieJwtToken = getCookie("cookieJwtToken");
      console.log("cookieJwtToken", cookieJwtToken);

      try {
        let response: lensessType = await customfetch({
          url: addItemToCartUrl,
          method: "POST",
          body: {
            Lens_Coating_Name: data.lensCoating,
            Thickness_Size: data.thickness,
            Cylinder_Size: data.cylinder,
            Prescription_Strength_Size: data.prescriptionStrength,
          },
        });
        console.log(response);
        // setDatacategory(response[0].Category)

        if (response) {
          try {
            const addItemToCartUrl = `${baseUrl.loaclhost}/cart/addItemToCart/Lenses/${response.Id}`;
            const cookieJwtToken = getCookie("cookieJwtToken");
            console.log("cookieJwtToken", cookieJwtToken);

            try {
              let response = await customfetch({
                url: addItemToCartUrl,
                method: "GET",
                headers: {
                  // Add custom headers here if needed
                  Authorization: `Bearer ${cookieJwtToken}`,
                },
              });
              console.log(response);
              // setDatacategory(response[0].Category)
            } catch (error) {
              console.log("error", error);
              //setlogedIn(false);
            }
          } catch (error) {}
        }
      } catch (error) {
        console.log("error", error);
      }
    }

    if (data) {
      interface Lenses {
        Id: number;
        Brand_Id: number;
        Cylinder_Id: number;
        Lens_Coating_id: number;
        Prescription_Strength_Id: number;
        Thickness_Id: number;
        Image: number;
        Price: number;
        Created_At: string;
      }

      let getContactLensesByDetailsUrl = `${baseUrl.loaclhost}/shop/GetLensesByDetails`;
      let responseGetLensesByDetails: Lenses = await customfetch({
        url: getContactLensesByDetailsUrl,
        method: "POST",
        body: {
          Lens_Coating_Name: data.lensCoating,
          Thickness_Size: data.thickness,
          Cylinder_Size: data.cylinder,
          Prescription_Strength_Size: data.prescriptionStrength,
        },
      });
      console.log("responseGetLensesByDetails", responseGetLensesByDetails);

      interface productInventoryId {
        Id: number;
      }

      let getProductItemIdFromInventoryUrl = `${baseUrl.loaclhost}/inventory/getProductItemIdFromInventory/Lenses/${responseGetLensesByDetails.Id}`;
      let responseGetProductItemIdFromInventory: productInventoryId =
        await customfetch({
          url: getProductItemIdFromInventoryUrl,
          method: "GET",
        });
      console.log(
        "responseGetProductItemIdFromInventory",
        responseGetProductItemIdFromInventory
      );

      const updatedData = {
        ...data, // Copy all existing properties
        InventoryProductId: responseGetProductItemIdFromInventory.Id, // Add a new field "age" with value 30
      };
      //setCartArray((prevCartArray) => [...prevCartArray, data]);

      setCartArray((prevCartArray) => [...prevCartArray, updatedData]);
      // addItemToShoppingCartCookie(data);
      addItemToShoppingCartLocalStorage(updatedData);
      console.log("from hab bin submitted", updatedData);
    }
  };

  const minVision = -15;
  const maxVision = 15;
  const step = 0.25;
  const options = [];

  // Generate the options for the dropdown
  for (let i = minVision; i <= maxVision; i += step) {
    options.push(i.toFixed(2)); // Limit the decimal places to two
  }

  const [selectedValue, setSelectedValue] = useState("placeholder");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    // Set the initial selected value to "placeholder"
    setSelectedValue("placeholder");
  }, []);

  let dynamicClassForLensesFormContainer: string = "";
  if (
    !errors.prescriptionStrength?.message ||
    !errors.cylinder?.message ||
    !errors.lensCoating?.message ||
    !errors.thickness?.message
  ) {
    // console.log("!errors", errors);
    dynamicClassForLensesFormContainer =
      "dynamic-class-for-lenses-form-container";
  }

  // console.log("errors.prescriptionStrength",errors.prescriptionStrength);
  // console.log("errors.lensCoating",errors.lensCoating);

  interface FieldState {
    error?: FieldError | undefined;
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
  }

  let prescriptionStrengthFieldState: FieldState = getFieldState(
    "prescriptionStrength"
  );
  let prescriptionStrengthvaildField = isFieldValid(
    prescriptionStrengthFieldState
  );

  let lensCoatingFieldState: FieldState = getFieldState("lensCoating");
  let lensCoatingvaildField = isFieldValid(lensCoatingFieldState);

  let thicknessFieldState: FieldState = getFieldState("thickness");
  let thicknessvaildField = isFieldValid(thicknessFieldState);

  let cylinderFieldState: FieldState = getFieldState("cylinder");
  let cylinderVaildField = isFieldValid(cylinderFieldState);

  function checkNumber(input: number): boolean {
    const allowedNumbers = [1.5, 1.53, 1.57, 1.59, 1.61, 1.67, 1.74];
    return allowedNumbers.includes(input);
  }

  return (
    <div id="lenses-form-container">
      {/* <div id="lenses-indicator-container">
        <div id="lenses-title-container">{t("lenses.title")}</div>
        <div id="lenses-icon-indicator-container">
          <AiOutlineLine className="lenses-indicator-icons" />
          {prescriptionStrengthvaildField ? (
            <BsCircleFill className="lenses-indicator-icons" />
          ) : (
            <BsCircle className="lenses-indicator-icons" />
          )}
          <AiOutlineLine className="lenses-indicator-icons" />
          {lensCoatingvaildField ? (
            <BsCircleFill className="lenses-indicator-icons" />
          ) : (
            <BsCircle className="lenses-indicator-icons" />
          )}
          <AiOutlineLine className="lenses-indicator-icons" />
          {thicknessvaildField ? (
            <BsCircleFill className="lenses-indicator-icons" />
          ) : (
            <BsCircle className="lenses-indicator-icons" />
          )}
          <AiOutlineLine className="lenses-indicator-icons" />
          {cylinderVaildField ? (
            <BsCircleFill className="lenses-indicator-icons" />
          ) : (
            <BsCircle className="lenses-indicator-icons" />
          )}
          <AiOutlineLine className="lenses-indicator-icons" />
        </div>
      </div> */}

      <form id={"lenses-form"} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          className={`form-control-lensCoating ${dynamicClassForLensesFormContainer}`}
        >
          <label
            className="lenses-labels"
            htmlFor="lenses-prescriptionStrength"
          >
            {t(`lenses.prescriptionStrengthLabel`)}
          </label>
          <input
            className="lenses-form-inputs"
            placeholder={t("lenses.enterPrescriptionStrength")}
            type="number"
            min="-15"
            max="15"
            step="0.25"
            id="lenses-prescriptionStrength"
            {...register("prescriptionStrength", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "lenses.prescriptionStrengthIsRequired",
              },
              validate: {
                glassesSizeNumber: (fieldValue: number) => {
                  let validGlassesSizeNumber = glassesSizeNumber(fieldValue);
                  if (validGlassesSizeNumber === false) {
                    return "lenses.EnterAnumberRangingFromNegative15toPositive15InJumpsOfAQuarter";
                  }
                },
              },
            })}
          />
          {errors.prescriptionStrength?.message && (
            <p className="error">
              {t(`${errors.prescriptionStrength.message}`)}
            </p>
          )}
        </div>

        <div
          className={`form-control-lensCoating ${dynamicClassForLensesFormContainer}`}
        >
          <label className="lenses-labels" htmlFor="lenses-lensCoating">
            {t("lenses.lensCoating-SelectAnOptionLabel")}
          </label>
          <select
            id="lenses-lensCoating"
            {...register("lensCoating", {
              required: {
                value: true,
                message: "lenses.lensCoatingRequired",
              },
            })}
          >
            <option value="">{t("lenses.lensCoating")}</option>
            <option value="BluBlock">{t("lenses.lensCoating-BluBlock")}</option>
            <option value="Anti-Reflective">
              {t("lenses.lensCoating-Anti-Reflective")}
            </option>
          </select>
          {errors.lensCoating && (
            <p className="error"> {t(`${errors.lensCoating.message}`)}</p>
          )}
        </div>

        <div
          className={`form-control-thickness ${dynamicClassForLensesFormContainer}`}
        >
          <label className="thickness-labels" htmlFor="lenses-thickness">
            {t(`lenses.thicknessLabel`)}
          </label>
          <input
            className="lenses-form-inputs"
            placeholder={t("lenses.enterThickness")}
            type="number"
            id="lenses-thickness"
            {...register("thickness", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "lenses.thicknessIsRequired",
              },
              validate: {
                checkNumber: (fieldValue: number) => {
                  if (checkNumber(fieldValue)) {
                    return true;
                  } else {
                    return "lenses.invalidthicknesssize";
                  }
                },
              },
            })}
          />
          {errors.thickness?.message && (
            <p className="error">{t(`${errors.thickness.message}`)}</p>
          )}
        </div>

        <div
          className={`form-control-cylinder ${dynamicClassForLensesFormContainer}`}
        >
          <label className="lenses-labels" htmlFor="lenses-cylinder">
            {t(`lenses.cylinderLabel`)}
          </label>
          <input
            className="lenses-form-inputs"
            placeholder={t("lenses.entercylinder")}
            type="number"
            min="0.25"
            max="15"
            step="0.25"
            id="lenses-cylinder"
            {...register("cylinder", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "lenses.cylinderIsRequired",
              },
              validate: {
                cylinderSize: (fieldValue: number) => {
                  if (!cylinderSize(fieldValue)) {
                    return "lenses.cylinderInvaid";
                  }
                },
              },
            })}
          />
          {errors.cylinder?.message && (
            <p className="error">{t(`${errors.cylinder.message}`)}</p>
          )}
        </div>

        <div id="lenses-submit-container">
          <button type="submit" id="lenses-submit">
            {t("lenses.submit")}
          </button>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default Lenses;
