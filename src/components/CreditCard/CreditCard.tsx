import React, { useContext, useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import rexes from "constants/rexes";
import { useTranslation } from "react-i18next";
import {
  clearShoppingCartLocalStorage,
  getCookie,
  isValidCreditCardDate,
} from "utils";
import { customfetch } from "api";
import "./creditcard.css";
import { logInStore } from "contexts";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants";
import Loading from "components/Loading";
import { jwtDecode } from "jwt-decode";

const CreditCard = () => {
  clearShoppingCartLocalStorage();
  const [t] = useTranslation("global");
  const navigate = useNavigate();

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const [errors, setErrors] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const {
    totalOrder,
    setRenderOnOreder,
    renderOnOreder,
    personData,
    userData,
    cilintUserName,
    ciintFullData
  } = useContext(logInStore);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
    // Clear the specific field error when the user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, focus: evt.target.name as Focused }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "number":
        if (!rexes.has16digitsFromStartToEnd.test(value)) {
          return "creditcard.invalidcreditcardnumber";
        }
        break;
      case "expiry":
        let isValid = isValidCreditCardDate(value);
        if (isValid === false) {
          return "creditcard.invalidExparyDate";
        }
        if (!rexes.has4digitsFromStartToEnd.test(value)) {
          return "creditcard.ExparyDateToLong";
        }
        break;
      case "cvc":
        if (!rexes.has3digitsFromStartToEnd.test(value)) {
          return "creditcard.invalidcvc";
        }

        break;
      case "name":
        if (value.trim() === "") {
          return "creditcard.creditcardNameIsRequired";
        }

        if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(value)) {
          return "creditcard.creditcardNameIsReInvalid";
        }
        break;
      default:
        break;
    }
    return ""; // No error
  };

  const handleInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const [loading, setLoading] = useState(false);

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    console.log("test111");

    setLoading(true);
    console.log(
      "Form data:",
      isFormValid() && areAllFieldsEmpty(state) && hasNoEmptyFields(state)
    );

    if (isFormValid() && areAllFieldsEmpty(state) && hasNoEmptyFields(state)) {
      console.log("Form data:", errors);

      if (userData.User_Role_Type_Id != 3 && cilintUserName != "") {
        (async () => {
          try {
            let response = await customfetch({
              url: `${baseUrl.loaclhost}/order/inHose`,
              method: "POST",
              body: {
                Payment_Method_Type_Id: 1,
                Payment_Status: 1,
                User_Name: cilintUserName
              },
              headers: {
                Authorization: `Bearer ${getCookie("cookieJwtToken")}`,
              },
            });
            console.log("oreder response", response);
            if (response) {
              console.log("");

              // try {
              //   let response = await customfetch({
              //     url: `${baseUrl.loaclhost}/cart/deleteAllItemsByUserId`,
              //     method: "DELETE",
              //     body: {
              //       UserId: userData.Id,
              //     },
              //     headers: {
              //       Authorization: `Bearer ${getCookie("cookieJwtToken")}`,
              //     },
              //   });
              //   console.log("response cleard employees cart", response);
              // } catch (error) {
              //   console.log("error", error);
              // }
              try {
                let response1 = await customfetch({
                  url: `${baseUrl.loaclhost}/cart/transferCartItems`,
                  method: "POST",
                  body: {
                    FirstUserId: userData.Id,
                    SecondUserId: ciintFullData.Id,
                  },
                  headers: {
                    Authorization: `Bearer ${getCookie("cookieJwtToken")}`,
                  },
                });
                console.log("response1", response1);
                
              } catch (error) {
                console.log("error", error);
              }

              clearShoppingCartLocalStorage();
              setRenderOnOreder(!renderOnOreder);

              try {
                let sendWelcomEmail = await customfetch({
                  url: `${baseUrl.loaclhost}/mail/order`,
                  method: "POST",
                  body: {
                    address: personData.Email,
                  },
                });
              } catch (error) {
                console.log("erorr trying to send welcom email", error);
              }
              setLoading(false);
              navigate("/order/FinalOrderDetails");
            }
          } catch (error) {
            console.log("error", error);
          }
        })();
      } else {
        (async () => {
          try {
            let response = await customfetch({
              url: `${baseUrl.loaclhost}/order/online`,
              method: "POST",

              body: {
                Payment_Method_Type_Id: 2,
                Payment_Status: 1,
              },
              headers: {
                Authorization: `Bearer ${getCookie("cookieJwtToken")}`,
              },
            });
            console.log("oreder response", response);
            if (response) {
              clearShoppingCartLocalStorage();
              setRenderOnOreder(!renderOnOreder);

              try {
                let sendWelcomEmail = await customfetch({
                  url: `${baseUrl.loaclhost}/mail/order`,
                  method: "POST",
                  body: {
                    address: personData.Email,
                  },
                });
              } catch (error) {
                console.log("erorr trying to send welcom email", error);
              }
              setLoading(false);
              navigate("/order/FinalOrderDetails");
            }
          } catch (error) {
            console.log("error", error);
          }
        })();
      }
    } else {
      console.log("Validation failed. Please fill in all fields.");
    }
  };

  const isFormValid = () => {
    // Check if there are no errors in any field
    console.log();

    return Object.values(errors).every((error) => error === "");
  };

  function areAllFieldsEmpty(obj: Record<string, any>): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== "") {
        return true;
      }
    }
    return false;
  }

  function hasNoEmptyFields(obj: Record<string, any>): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === "") {
        return false;
      }
    }
    return true;
  }

  let creditCard = (
    <Cards
      number={state.number}
      expiry={state.expiry}
      cvc={state.cvc}
      name={state.name}
      focused={state.focus as Focused}
      placeholders={{ name: t("creditcard.OnerName") }}
    />
  );
  return loading ? (
    <Loading />
  ) : (
    <div id="credit-card-container">
      <div id="creditCard-container">{creditCard}</div>
      <form id="credit-card-form" onSubmit={handleSubmit}>
        <input
          className="credit-card-inputs"
          type="number"
          name="number"
          placeholder={t("creditcard.CardNumber")}
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className="error">{t(`${errors.number}`)} </div>
        <input
          className="credit-card-inputs"
          type="text"
          name="expiry"
          placeholder={t("creditcard.ExpirationDate")}
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div className="error">{t(`${errors.expiry}`)} </div>

        <input
          className="credit-card-inputs"
          type="text"
          name="cvc"
          placeholder={t("creditcard.CVV")}
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div className="error">{t(`${errors.cvc}`)} </div>
        <input
          className="credit-card-inputs"
          type="text"
          name="name"
          placeholder={t("creditcard.OnerName")}
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div className="error">{t(`${errors.name}`)} </div>

        {/* <button
              id="credit-card-submit-btn"
              type="submit"
              disabled={!isFormValid()}
            >
              {t("creditcard.order")}
            </button> */}

        <div className={`order-submit-container`}>
          <button
            disabled={!isFormValid()}
            type="submit"
            id="order-submit"
            onClick={() => {
              setRenderOnOreder((prevState) => !prevState);
            }}
          >
            {t("order.order")}
          </button>
        </div>

        {/* <div id="total-amont-container">
          <div id="title">{t(`order.totalOrder`)}</div>
        </div> */}
      </form>
    </div>
  );
};

export default CreditCard;
