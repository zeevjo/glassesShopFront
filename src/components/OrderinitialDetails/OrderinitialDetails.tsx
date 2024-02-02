import React, { useContext, useEffect, useState } from "react";
// import "./order.css";
import { logInStore } from "contexts";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  clearShoppingCartLocalStorage,
  getCookie,
  hasNoNumbers,
  hasSpaces,
  isAtLeast4Characters,
} from "utils";
import { RxSlash } from "react-icons/rx";
import * as EmailValidator from "email-validator";
// import "./order.css";
import { CreditCard, Loading } from "components";
import { Outlet, useNavigate } from "react-router-dom";
import { customfetch } from "api";
import baseUrl from "constants/test/baseUrl";
import "./orderinitialDetails.css";
import { user } from "interfaces";

type orederType = {
  firstName: string;
  lastName: string;
  email: string;
  creditCardFullNum: string;
  creditCardExparyDateMonth: string;
  creditCardExparyDateYear: string;
  creditCardCvv: string;
  username: string;
};

const OrderinitialDetails = () => {
  const {
    totalOrder,
    personData,
    userData,
    setRenderOnOreder,
    renderOnOreder,
    setCilintUserName,
    setCiintFullData,
    ciintFullData
  } = useContext(logInStore);
  const [defaultValues, setdefaultValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("");

  const [t, i18n] = useTranslation("global");

  const form = useForm<orederType>({
    mode: "all",
    defaultValues: {
      firstName: personData?.First_Name,
      lastName: personData?.Last_Name,
      email: personData?.Email,
    },
    // defaultValues: defaultValues,
  });

  useEffect(() => {
    if (personData && userData.User_Role_Type_Id === 3) {
      console.log("check123");
      form.setValue("firstName", personData.First_Name);
      form.setValue("lastName", personData.Last_Name);
      form.setValue("email", personData.Email);
      setLoading(false);
    } else {
      console.log("check1234");
      form.setValue("firstName", "");
      form.setValue("lastName", "");
      form.setValue("email", "");
      setLoading(false);
    }
  }, [personData, form]);

  const [payment, setPayment] = useState(false);
  const [PersonalInformation, setPersonalInformation] = useState(true);
  const [userDetailsInform, setUserDetailsInform] = useState(false);
  const [clinitUserNameFromForm, setClinitUserNameFromForm] = useState("");

  useEffect(() => {
    console.log("testa", clinitUserNameFromForm, userDetailsInform);
    async function fetchData() {
      console.log("testB", clinitUserNameFromForm, userDetailsInform);
      if (userDetailsInform === true) {
        console.log("testc", clinitUserNameFromForm, userDetailsInform);

        try {
          if (clinitUserNameFromForm != "") {
            console.log("testd", clinitUserNameFromForm, userDetailsInform);
            const cookieJwtToken = getCookie("cookieJwtToken");
            let response: user = await customfetch({
              url: `${baseUrl.loaclhost}/user`,
              method: "POST",
              headers: { Authorization: `Bearer ${cookieJwtToken}` },
              body: {
                User_Name: clinitUserNameFromForm,
              },
            });
            console.log(
              "teste",
              clinitUserNameFromForm,
              userDetailsInform,
              response
            );
            setCilintUserName(response.User_Name);
            setCiintFullData(response);
            interface UserTest {
              Bday: string;
              Created_At: string;
              Email: string;
              First_Name: string;
              Id: number;
              Last_Name: string;
              Phon_Number: string;
              Profile_Picture: string;
            }

            let response2: UserTest = await customfetch({
              url: `${baseUrl.loaclhost}/user/getUesrFullPersonDataById`,
              method: "POST",
              headers: { Authorization: `Bearer ${cookieJwtToken}` },
              body: {
                Id: response.Id,
              },
            });

            console.log("response2", response2);

            form.setValue("firstName", response2.First_Name);
            form.setValue("lastName", response2.Last_Name);
            form.setValue("email", response2.Email);

            // Rest of your logic
          }
        } catch (error) {
          console.log("error", error);

          // Handle error here
        }
      }
    }

    fetchData();
  }, [userDetailsInform]);

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
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    console.log("data", data);
    setPayment(true);
    setPersonalInformation(false);

    if (selectedPayment === "cash") {
      setLoading(true);
      (async () => {
        try {
          let response = await customfetch({
            url: `${baseUrl.loaclhost}/order/inHose`,
            method: "POST",
            body: {
              Payment_Method_Type_Id: 1,
              Payment_Status: 1,
              User_Name: clinitUserNameFromForm,
            },
            headers: {
              Authorization: `Bearer ${getCookie("cookieJwtToken")}`,
            },
          });
          console.log("oreder response", response);
          if (response) {
            try {
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

              // let response = await customfetch({
              //   url: `${baseUrl.loaclhost}/cart/deleteAllItemsByUserId`,
              //   method: "DELETE",
              //   body: {
              //     UserId: userData.Id,
              //   },
              //   headers: {
              //     Authorization: `Bearer ${getCookie("cookieJwtToken")}`,
              //   },
              // });
              // console.log("response cleard employees cart", response);
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
      navigate("/order/payment");
    }
  };

  const { errors } = formState;
  let dynamicClassForInputs: string = "";
  if (!errors.creditCardCvv?.message) {
    // console.log("!errors.password?.message", !errors.firstName?.message);
    dynamicClassForInputs = "dynamicClassForInputs";
  }

  interface UserObject {
    User_Name: string;
    // Add other fields if needed
  }

  console.log("dfhjwsebfjwerh", userData);
  function hasMatchingValue(arr: UserObject[], searchValue: string): boolean {
    // Use the `some` method to check if any object in the array has the matching value
    return arr.some((obj) => obj.User_Name === searchValue);
  }
  return loading === false ? (
    <>
      {PersonalInformation && (
        <form
          className={`oredr-form-container`}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* <div
                className={`testtttt`}
              > */}

          <div id="order-from-control-group" className="test2">
            {/* 1*/}
            {userData.User_Role_Type_Id === 1 ||
            userData.User_Role_Type_Id === 2 ? (
              <div className={`order-form-control order-form-control-2  `}>
                <label className="order-labels" htmlFor="username">
                  {t(`signup.userNameInputLabel`)}
                </label>
                <input
                  className="order-form-inputs"
                  type="text"
                  id="username"
                  {...register("username", {
                    // disabled: true,
                    required: {
                      value: true,
                      message: "signup-validation.erorrUsernameRequired",
                      // message:t(`signup-validation.erorrUsernameRequired`),
                    },
                    validate: {
                      startsWithSpace: (fieldValue) => {
                        const firstChar = fieldValue[0];

                        if (firstChar === " ") {
                          // return "Field must not start with a space";
                          return "signup-validation.usernameCantstartsWithSpace";
                        }
                      },
                      hasSpaces: (fieldValue) => {
                        const fieldValueHasSpaces = hasSpaces(fieldValue);

                        if (fieldValueHasSpaces === true) {
                          return "signup-validation.usernameCantHaveSpaces";
                        }
                      },
                      isAtLeast4Characters: (fieldValue) => {
                        if (!isAtLeast4Characters(fieldValue)) {
                          return "signup-validation.usernameNeedsAtLeast4Characters";
                        }
                      },
                      UsernameExists: async (fieldValue) => {
                        const response: UserObject[] = await customfetch({
                          url: `${baseUrl.loaclhost}/user/getAllUserNames`,
                          method: "GET",
                        });

                        console.log("response", response);

                        if (hasMatchingValue(response, fieldValue)) {
                          console.log(
                            "hasMatchingValue",
                            fieldValue,
                            hasMatchingValue(response, fieldValue)
                          );

                          //return "signup-validation.thisUserNameAlreadyExists";
                          setClinitUserNameFromForm(fieldValue);
                          setUserDetailsInform(true);
                          return true;
                        } else {
                          return "signup-validation.userdoesnotexist";
                        }
                      },
                    },
                  })}
                />
                {errors.username?.message && (
                  <p className="error">{t(`${errors.username?.message}`)}</p>
                )}
              </div>
            ) : null}

            {/* 2 */}
            <div className={`order-form-control order-form-control-2  `}>
              <label className="order-labels" htmlFor="order-firstname">
                {t(`signup.firstname`)}
              </label>
              <input
                className="order-form-inputs"
                type="text"
                id="order-firstname"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "order-validation.firstNameIsRequired",
                  },
                  validate: {
                    startsWithSpace: (fieldValue) => {
                      const firstChar = fieldValue[0];

                      if (firstChar === " ") {
                        return "order-validation.firstNameCantStartWithSpace";
                      }
                    },
                    hasSpaces: (fieldValue) => {
                      const fieldValueHasSpaces = hasSpaces(fieldValue);

                      if (fieldValueHasSpaces === true) {
                        return "order-validation.firstNameCantHaveSpaces";
                      }
                    },
                    moreThenTwoChracters: (fieldValue) => {
                      if (fieldValue.length <= 2) {
                        return "order-validation.firstNameMustHaveMoreThen2Chracters";
                      }
                    },
                    hasNoNumbers: (fieldValue) => {
                      if (!hasNoNumbers(fieldValue)) {
                        return "order-validation.firstNameCantHaveNumbers";
                      }
                    },
                  },
                })}
              />
              {errors.firstName?.message && (
                <p className="error">{t(`${errors.firstName?.message}`)}</p>
              )}
            </div>

            <div className={`order-form-control order-form-control-2 `}>
              <label className="order-labels" htmlFor="order-lastName">
                {t(`signup.lastName`)}
              </label>
              <input
                className="order-form-inputs"
                //disabled
                //prevent user from interacting with the filde
                type="text"
                id="order-lastName"
                {...register("lastName", {
                  // disabled: true,
                  required: {
                    value: true,
                    message: "order-validation.lastnameisrequired",
                  },
                  validate: {
                    startsWithSpace: (fieldValue) => {
                      const firstChar = fieldValue[0];

                      if (firstChar === " ") {
                        // return "Field must not start with a space";
                        return "order-validation.lastnamecantstartwithspace";
                      }
                    },
                    hasSpaces: (fieldValue) => {
                      const fieldValueHasSpaces = hasSpaces(fieldValue);

                      if (fieldValueHasSpaces === true) {
                        return "order-validation.lastnamecanthavespaces";
                      }
                    },
                    moreThenTwoChracters: (fieldValue) => {
                      if (fieldValue.length <= 2) {
                        return "order-validation.lastnamemostbelongerthentwochracters";
                      }
                    },
                    hasNoNumbers: (fieldValue) => {
                      if (!hasNoNumbers(fieldValue)) {
                        return "order-validation.lastnamecantcontianumbers";
                      }
                    },
                  },
                })}
              />
              {/* <p className="error">{errors.username?.message}</p> */}
              {errors.lastName?.message && (
                <p className="error">{t(`${errors.lastName?.message}`)}</p>
              )}
            </div>

            <div className={`order-form-control order-form-control-2 `}>
              <label className="order-labels" htmlFor="order-email-input">
                {t(`signup.emailInputLabel`)}
              </label>
              <input
                className="order-form-inputs"
                type="email"
                id="order-email-input"
                {...register("email", {
                  required: {
                    value: true,
                    message: "order-validation.erorrEmailRequired",
                  },
                  validate: {
                    startsWithSpace: (fieldValue) => {
                      const firstChar = fieldValue[0];

                      if (firstChar === " ") {
                        // return "Field must not start with a space";
                        return "order-validation.erorrstartsWithSpace";
                      }

                      // console.log(fieldValue);
                    },
                    emailFormatValdtion: (fieldValue) => {
                      if (!EmailValidator.validate(fieldValue)) {
                        return "order-validation.IncorrectEmailFormat";
                      }
                    },
                    hasSpaces: (fieldValue) => {
                      const fieldValueHasSpaces = hasSpaces(fieldValue);

                      if (fieldValueHasSpaces === true) {
                        return "order-validation.erorrFieldValueHasSpaces";
                      }
                    },
                  },
                })}
              />
              {errors.email?.message && (
                <p className="error">{t(`${errors.email.message}`)}</p>
              )}
            </div>

            {userData.User_Role_Type_Id != 3 ? (
              <div className={`order-form-control order-form-control-2`}>
                <label className="order-labels" htmlFor="test123456">
                  {t(`order.selectpaymentMethod`)}
                </label>
                <select
                  id="test123456"
                  className="order-select-payment-method order-form-inputs"
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  value={selectedPayment}
                >
                  <option value="" disabled>
                    {t(`order.paymentMethod`)}
                  </option>
                  <option value="cash"> {t(`order.cash`)}</option>
                  <option value="credit"> {t(`order.creditCard`)}</option>
                </select>
              </div>
            ) : null}
          </div>

          <div className={`order-submit-container `}>
            <button
              type="submit"
              id="order-submit"
              disabled={
                selectedPayment === "" && userData.User_Role_Type_Id != 3
              }
            >
              {selectedPayment === "credit" || selectedPayment === ""
                ? t("order.Continue")
                : t("order.order")}
            </button>
          </div>
        </form>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default OrderinitialDetails;
