import React, { useContext, useState } from "react";
import { DevTool } from "@hookform/devtools";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray } from "react-hook-form";
import { customfetch } from "api";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  getCookie,
  deleteCookie,
  setCookie,
  containsUppercaseLetter,
  containsLowercaseLetter,
  containsDigit,
  containsSpecialCharacter,
  isAtLeast4Characters,
} from "utils";
import { logInStore } from "contexts";
import { hasSpaces } from "utils";
import { isAtLeast8Characters } from "utils";
import { user } from "interfaces";
import { baseUrl } from "../../constants";
import { Loading } from "components";

type logInValue = {
  username: string;
  password: string;
};

const Login = () => {
  const [t, i18n] = useTranslation("global");
  const {
    logedIn,
    setlogedIn,
    cartStorageChange,
    setCartStorageChange,
    setDashBordShopIsActive,
    setOnOnerlogsIn,
  } = useContext(logInStore);
  const navigate = useNavigate();
  const form = useForm<logInValue>({
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;

  const {
    errors,
    // touchedFields, dirtyFields, isDirty
  } = formState;

  interface ApiResponse {
    authToken: string;
    // Add other properties if needed
  }

  const onSubmit = async (data: logInValue) => {
    //send data to the API
    console.log("from hab bin submitted", data);

    let response: ApiResponse = await customfetch({
      // url: "${baseUrl.loaclhost}/LogIn",
      // method: "POST",
      // body: {
      //   User_Name: "janeSmith23",
      //   // User_Name: "aliceJ",
      //   Password: "1234",
      // },
      url: `${baseUrl.loaclhost}/LogIn`,
      method: "POST",
      body: {
        User_Name: data.username,
        Password: data.password,
      },
    });

    const authTokenValue = response.authToken;
    console.log(authTokenValue);

    //30 days
    setCookie("cookieJwtToken", authTokenValue, 30);

    const cookieJwtToken = getCookie("cookieJwtToken");

    if (cookieJwtToken && cookieJwtToken != "undefined") {
      // console.log("1");
      console.log("Cookie jwt", cookieJwtToken);
    } else {
      console.log("JWT Token not found.");
    }

    if (cookieJwtToken != "undefined") {
      const decoded: user = jwtDecode(cookieJwtToken!);
      console.log("decoded jwt in login", decoded);

      if (decoded.User_Role_Type_Id === 2) {
        // setDashBordShopIsActive(true);
        setOnOnerlogsIn(true);
      } else {
        setDashBordShopIsActive(false);
        setOnOnerlogsIn(false);
      }
    }

    if (response.authToken) {
      console.log("check1");
      
      setlogedIn(true);
      setCartStorageChange(!cartStorageChange);
      const decoded: user = jwtDecode(cookieJwtToken!);
      console.log("decoded", decoded);
      
      if (decoded.User_Role_Type_Id === 2|| decoded.User_Role === 2) {
        navigate("/dashboard/Users");
      } else if (decoded.User_Role_Type_Id === 1 || decoded.User_Role === 1){
        navigate("/shop");
      } else {
          navigate("/home");
      }
    
    }
  };

  interface UserObject {
    User_Name: string;
    // Add other fields if needed
  }

  let dynamicIdForPasswordFormControl: string = "";
  if (!errors.password?.message) {
    dynamicIdForPasswordFormControl = "dynamicIdForPasswordFormControl";
  }

  return (
    <div>
      <form
        id="login-form-container"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div id="login-grop-input">
          <h1 id="login-title">{t(`login.login`)}</h1>
          {/* <h2 id="login-message">{t(`login.message`)}</h2> */}
          <div className="form-control">
            <label className="login-labels" htmlFor="username">
              {t(`login.userNameInputLabel`)}
            </label>
            <input
              className="login-form-inputs"
              //disabled
              //prevent user from interacting with the filde
              type="text"
              id="username-password-input"
              {...register("username", {
                // disabled: true,
                required: {
                  value: true,
                  message: "login-validation.erorrUsernameRequired",
                  // message:t(`login-validation.erorrUsernameRequired`),
                },
                validate: {
                  startsWithSpace: (fieldValue) => {
                    const firstChar = fieldValue[0];

                    if (firstChar === " ") {
                      // return "Field must not start with a space";
                      return "login-validation.erorrstartsWithSpace";
                    }
                  },
                  hasSpaces: (fieldValue) => {
                    const fieldValueHasSpaces = hasSpaces(fieldValue);

                    if (fieldValueHasSpaces === true) {
                      return "login-validation.erorrFieldValueHasSpaces";
                    }
                  },
                  isAtLeast4Characters: (fieldValue) => {
                    if (!isAtLeast4Characters(fieldValue)) {
                      return "login-validation.erorrFieldValue4Characters";
                    }
                  },
                  moreThenTwoChracters: (fieldValue) => {
                    if (fieldValue.length <= 2) {
                      return "login-validation.UserNameMustmoreThen2Chracters";
                    }
                  },
                },
              })}
            />
            {/* <p className="error">{errors.username?.message}</p> */}
            {errors.username?.message && (
              <p className="error">{t(`${errors.username?.message}`)}</p>
            )}
          </div>

          <div id={dynamicIdForPasswordFormControl} className="form-control">
            <label className="login-labels" htmlFor="email">
              {t(`login.passWordInputLabel`)}
            </label>
            <input
              className="login-form-inputs"
              type="text"
              id="login-password-input"
              {...register("password", {
                required: {
                  value: true,
                  message: "login-validation.erorrPasswordRequired",
                  // message:t(`login-validation.erorrUsernameRequired`),
                },
                // pattern: {
                //   value:
                //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                //   message: "bla bla bla",
                // },
                // pattern: {
                //   value: /^.{8,}$/,
                //   message: "login-validation.PasswordMostBeAtleast8CharactersLong",
                // },
                validate: {
                  // notAdmin: (fieldValue) => {
                  //   return (
                  //     fieldValue !== "admin@example.com" ||
                  //     "Enter a different email address"
                  //   );
                  // },
                  // notBlackListed: (fieldValue) => {
                  //   return (
                  //     !fieldValue.endsWith("badddomain.com") ||
                  //     "This domain is not supported"
                  //   );
                  // },

                  //yoyo
                  isAtLeast8Characters: (fieldValue) => {
                    if (!isAtLeast8Characters(fieldValue)) {
                      return "login-validation.PasswordMostBeAtleast8CharactersLong";
                    }
                  },
                  containsUppercaseLetter: (fieldValue) => {
                    if (!containsUppercaseLetter(fieldValue)) {
                      return "login-validation.PasswordMostHaveAtLeastOneUppercaseLetter";
                    }
                  },
                  containsLowercaseLetter: (fieldValue) => {
                    if (!containsLowercaseLetter(fieldValue)) {
                      return "login-validation.PasswordMostHaveAtLeastOneLowerCaseLetter";
                    }
                  },
                  containsDigit: (fieldValue) => {
                    if (!containsDigit(fieldValue)) {
                      return "login-validation.PasswordMostHaveAtLeastOneDigit";
                    }
                  },
                  containsSpecialCharacter: (fieldValue) => {
                    if (!containsSpecialCharacter(fieldValue)) {
                      return "login-validation.PasswordMostHaveAtLeastOneSpecialCharacter";
                    }
                  },

                  // containsUppercaseLetter: (fieldValue) => {
                  //   if (!containsUppercaseLetter(fieldValue)) {
                  //     return " login.PasswordMostHaveAtLeastOneUppercaseLetter";
                  //   }
                  // },
                },
              })}
            />
            {errors.password?.message && (
              <p className="error">{t(`${errors.password.message}`)}</p>
            )}
            <div id="login-new-customer-container">
              {t(`login.newCustomerMessage`)}
              <Link id="login-new-customer-message" to={"/SignUp"}>
                {t(`login.newCustomerLinkMessage`)}
              </Link>
            </div>
          </div>

          <div id="login-submit-button-container">
            <button id="login-submit-button">{t(`login.submit`)}</button>
          </div>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default Login;

//  At least 8 characters long.
//  Contains at least one uppercase letter.
//  Contains at least one lowercase letter.
//  Contains at least one digit.
//  Contains at least one special character (e.g., !, @, #, $, etc.).
