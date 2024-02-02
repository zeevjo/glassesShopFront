import React, { useContext, useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray, useWatch, FieldError } from "react-hook-form";
import {
  addItemToShoppingCartCookie,
  addItemToShoppingCartLocalStorage,
  cylinderSize,
  getCookie,
  getShoppingCartLocalStorage,
  glassesSizeNumber,
  isFieldValid,
} from "utils";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { customfetch } from "api";
import "./ContactLensesForm.css";
// import "./lenses.css";

// import "./lenses.css";
import { Interface } from "readline";
import { logInStore } from "contexts";
import { log } from "console";
import  {baseUrl}  from "../../constants";

type ContactLensesType = {
  prescriptionStrength: number;
  ExpiryDate: string;
  cylinder: number;
};

const ContactLensesForm = () => {
  const form = useForm<ContactLensesType>({ mode: "all" });
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
    reset,
  } = form;

  const watchedFieldValue = useWatch({
    control, // Provide the control instance from useForm
    name: "prescriptionStrength", // Replace with the name of the field you want to watch
  });
  const { cartArray, setCartArray } = useContext(logInStore);

  const { dashBordShopIsActive, setDashBordShopIsActive } =
    useContext(logInStore);
  // console.log(watchedFieldValue);

  const { errors } = formState;

  const onSubmit = async (data: ContactLensesType) => {
    //add item to cart

    type contactLensType = {
      Id: number;
      Price: number;
      Cylinder_Id: number;
      Prescription_Strength_Id: number;
      Expiry_Date_Id: number;
      Brand_Id: number;
      Image: number;
    };

    if (logedIn) {
      const addItemToCartUrl = `${baseUrl.loaclhost}/shop/GetContactLensesByDetails`;
      const cookieJwtToken = getCookie("cookieJwtToken");
      console.log("cookieJwtToken", cookieJwtToken);

      try {
        let response: contactLensType = await customfetch({
          url: addItemToCartUrl,
          method: "POST",
          body: {
            Expiry_Date_Name: data.ExpiryDate,
            Cylinder_Size: data.cylinder,
            Prescription_Strength_Size: data.prescriptionStrength,
          },
        });
        console.log(response);
        // setDatacategory(response[0].Category)

        if (response) {
          try {
            const addItemToCartUrl = `${baseUrl.loaclhost}/cart/addItemToCart/Contact_Lenses/${response.Id}`;
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
            } catch (error) {
              console.log("error", error);
              //setlogedIn(false);
            }
          } catch (error) {}
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setlogedIn(false);
    }

    if (data) {
      console.log(data);

      interface ContactLens {
        Brand_Id: number;
        Created_At: string;
        Cylinder_Id: number;
        Expiry_Date_Id: number;
        Id: number;
        Image: number;
        Prescription_Strength_Id: number;
        Price: number;
      }

      let getContactLensesByDetailsUrl =
        `${baseUrl.loaclhost}/shop/getContactLensesByDetails`;
      let responseGetContactLensesByDetails: ContactLens = await customfetch({
        url: getContactLensesByDetailsUrl,
        method: "POST",
        body: {
          Cylinder_Size: data.cylinder,
          Prescription_Strength_Size: data.prescriptionStrength,
          Expiry_Date_Name: data.ExpiryDate,
        },
      });

      console.log(
        "responseGetContactLensesByDetails",
        responseGetContactLensesByDetails
      );

      interface productInventoryId {
        Id: number;
      }

      let getProductItemIdFromInventoryUrl = `${baseUrl.loaclhost}/inventory/getProductItemIdFromInventory/Contact_Lenses/${responseGetContactLensesByDetails.Id}`;
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
      setCartArray((prevCartArray) => [...prevCartArray, data]);
      // setCartArray((prevCartArray) => [...prevCartArray, updatedData]);
      // addItemToShoppingCartCookie(data);

      addItemToShoppingCartLocalStorage(updatedData);

      // const shoppingCartLocalStoage = getShoppingCartLocalStorage();
      // console.log("shoppingCartLocalStoage123", shoppingCartLocalStoage);
      console.log("from hab bin submitted", updatedData);

      //reset();

      // const shoppingCartLocalStoage = getShoppingCartLocalStorage();
      // console.log("shoppingCartLocalStoage123", shoppingCartLocalStoage);
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

  let dynamicClassForLensesFormContainer: string = "";
  if (
    !errors.prescriptionStrength?.message ||
    !errors.ExpiryDate?.message ||
    !errors.cylinder?.message
  ) {
    dynamicClassForLensesFormContainer =
      "dynamic-class-for-lenses-form-container";
  }
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

  let cylinderFieldState: FieldState = getFieldState("cylinder");
  let cylinderVaildField = isFieldValid(cylinderFieldState);

  let ExpiryDateFieldState: FieldState = getFieldState("ExpiryDate");
  let ExpiryDateVaildField = isFieldValid(ExpiryDateFieldState);

  function checkNumber(input: number): boolean {
    const allowedNumbers = [1.5, 1.53, 1.57, 1.59, 1.61, 1.67, 1.74];
    return allowedNumbers.includes(input);
  }

  return (
    <div
      id="contactlenses-form-container"
      style={{ marginTop: dashBordShopIsActive ? "0px" : "0px" }}
    >
      {/* <div
        id="contactlenses-indicator-container"
        style={{ marginTop: dashBordShopIsActive ? "0px" : "0px" }}
      >
        <div id="lenses-title-container">{t("lenses.contactLenses")}</div>
        <div id="lenses-icon-indicator-container">
          <AiOutlineLine className="lenses-indicator-icons" />
          {prescriptionStrengthvaildField ? (
            <BsCircleFill className="lenses-indicator-icons" />
          ) : (
            <BsCircle className="lenses-indicator-icons" />
          )}{" "}
          <AiOutlineLine className="lenses-indicator-icons" />
          {ExpiryDateVaildField ? (
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
            {t("lenses.ExparyDate")}
          </label>
          <select
            id="lenses-lensCoating"
            {...register("ExpiryDate", {
              required: {
                value: true,
                message: "lenses.lensCoatingRequired",
              },
            })}
          >
            <option value="">{t("lenses.selectAnExparyDate")}</option>
            <option className="contact-lenses-select-optins" value="daily">
              {t("lenses.daily")}
            </option>
            <option className="contact-lenses-select-optins" value="weekly">
              {t("lenses.weekly")}
            </option>
            <option className="contact-lenses-select-optins" value="monthly">
              {t("lenses.monthly")}
            </option>
            <option className="contact-lenses-select-optins" value="annual">
              {t("lenses.annual")}
            </option>
          </select>
          {errors.ExpiryDate && (
            <p className="error"> {t(`${errors.ExpiryDate.message}`)}</p>
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
        <div></div>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default ContactLensesForm;
