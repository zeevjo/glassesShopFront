import React, { useContext, useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray } from "react-hook-form";
import { customfetch } from "api";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as EmailValidator from "email-validator";
import {
  getCookie,
  deleteCookie,
  setCookie,
  containsUppercaseLetter,
  containsLowercaseLetter,
  containsDigit,
  containsSpecialCharacter,
  isAtLeast4Characters,
  hasNoNumbers,
  hasLetters,
} from "utils";
import { logInStore } from "contexts";
import { hasSpaces } from "utils";
import { isAtLeast8Characters } from "utils";
import { useScreenSize } from "hooks";
import { baseUrl } from "../../constants";
import { person, userRoleInterface } from "interfaces";

type SignUpValue = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  Bday: Date;
  password: string;
};

const SignUp = () => {
  let test123 = EmailValidator.validate("test@email.com");
  console.log("test123", test123);

  const [t, i18n] = useTranslation("global");
  const { logedIn, setlogedIn, setPersonData, personData } =
    useContext(logInStore);
  const navigate = useNavigate();
  let screenSize = useScreenSize();

  console.log("im the contextValue", logedIn);

  const form = useForm<SignUpValue>({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
      Bday: new Date(),
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

  const onSubmit = async (data: SignUpValue) => {
    //send data to the API
    console.log("from hab bin submitted", data);

    let response: ApiResponse = await customfetch({
      // url: "${baseUrl.loaclhost}/SignUp",
      // method: "POST",
      // body: {
      //   User_Name: "janeSmith23",
      //   // User_Name: "aliceJ",
      //   Password: "1234",
      // },
      url: `${baseUrl.loaclhost}/SignUp`,
      method: "POST",
      body: {
        First_Name: data.firstName,
        Last_Name: data.lastName,
        Email: data.email,
        Phone_Number: data.phoneNumber,
        Profile_Picture: "mockUrl",
        Bday: data.Bday,
        User_Name: data.username,
        Password: data.password,
      },
    });

    const authTokenValue = response.authToken;
    console.log(authTokenValue);

    setCookie("cookieJwtToken", authTokenValue, 30);

    const cookieJwtToken = getCookie("cookieJwtToken");

    if (cookieJwtToken && cookieJwtToken != "undefined") {
      // console.log("1");
      console.log("Cookie jwt", cookieJwtToken);
    } else {
      console.log("JWT Token not found.");
    }

    if (cookieJwtToken != "undefined") {
      const decoded = jwtDecode(cookieJwtToken!);
      console.log("decoded jwt in SignUp", decoded);
    }

    if (response.authToken) {
      console.log("im the contextValue", logedIn);

      ///////////
      //to get full user data
      let response: ApiResponse = await customfetch({
        url: `${baseUrl.loaclhost}/LogIn`,
        method: "POST",
        body: {
          User_Name: data.username,
          Password: data.password,
        },
      });

      if (response) {
        const authTokenValue = response.authToken;
        console.log(authTokenValue);

        //30 days
        setCookie("cookieJwtToken", authTokenValue, 30);

        //const cookieJwtToken = getCookie("cookieJwtToken");
        setlogedIn(true);

        try {
          let sendWelcomEmail = await customfetch({
            url: `${baseUrl.loaclhost}/mail/signup`,
            method: "POST",
            body: {
              address: data.email,
            },
          });
        } catch (error) {
          console.log("erorr trying to send welcom email", error);
        }
      }

      navigate("/home");
    }
  };

  interface UserObject {
    User_Name: string;
    // Add other fields if needed
  }

  function hasMatchingValue(arr: UserObject[], searchValue: string): boolean {
    // Use the `some` method to check if any object in the array has the matching value
    return arr.some((obj) => obj.User_Name === searchValue);
  }

  let dynamicClassForInputs: string = "";
  if (!errors.password?.message) {
    console.log("!errors.password?.message", !errors.password?.message);
    dynamicClassForInputs = "dynamicClassForInputs";
  }

  let dynamicClassForInputsWithErorr: string = "";
  if (errors.password?.message) {
    console.log("!errors.password?.message", errors.password?.message);
    dynamicClassForInputsWithErorr = "dynamicClassForInputsWithErorr";
  }

  let dynamicClassForInputGroup: string = "";
  if (!errors.password?.message) {
    console.log("!errors.password?.message", !errors.password?.message);
    dynamicClassForInputGroup = "dynamicClassForInputGroup";
  }

  let laptopDaynamicClassName: string = "";

  if (screenSize.width >= 1024) {
    laptopDaynamicClassName = "laptop";
  }

  // useEffect(() => {
  //   console.log(screenSize.width);

  // }, [screenSize.width])

  return (
    <div id="signup-container">
      <form
        className={`signup-form-container ${dynamicClassForInputsWithErorr}`}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={`signup-grop-input ${dynamicClassForInputGroup}`}>
          <h1 id="signup-title">{t(`signup.register`)}</h1>
          <div id="laptop-test-1">
            <div
              className={`form-control     ${dynamicClassForInputs} ${laptopDaynamicClassName}`}
            >
              <label className="signup-labels" htmlFor="signup-firstname">
                {t(`signup.firstname`)}
              </label>
              <input
                className="signup-form-inputs"
                type="text"
                id="signup-firstname"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "signup-validation.firstNameIsRequired",
                  },
                  validate: {
                    startsWithSpace: (fieldValue) => {
                      const firstChar = fieldValue[0];

                      if (firstChar === " ") {
                        return "signup-validation.firstNameCantStartWithSpace";
                      }
                    },
                    hasSpaces: (fieldValue) => {
                      const fieldValueHasSpaces = hasSpaces(fieldValue);

                      if (fieldValueHasSpaces === true) {
                        return "signup-validation.firstNameCantHaveSpaces";
                      }
                    },
                    moreThenTwoChracters: (fieldValue) => {
                      if (fieldValue.length <= 2) {
                        return "signup-validation.firstNameMustHaveMoreThen2Chracters";
                      }
                    },
                    hasNoNumbers: (fieldValue) => {
                      if (!hasNoNumbers(fieldValue)) {
                        return "signup-validation.firstNameCantHaveNumbers";
                      }
                    },
                  },
                })}
              />
              {errors.firstName?.message && (
                <p className="error">{t(`${errors.firstName?.message}`)}</p>
              )}
            </div>

            <div
              className={`form-control   ${dynamicClassForInputs}  ${laptopDaynamicClassName}`}
            >
              <label className="signup-labels" htmlFor="signup-lastName">
                {t(`signup.lastName`)}
              </label>
              <input
                className="signup-form-inputs"
                //disabled
                //prevent user from interacting with the filde
                type="text"
                id="signup-lastName"
                {...register("lastName", {
                  // disabled: true,
                  required: {
                    value: true,
                    message: "signup-validation.lastnameisrequired",
                  },
                  validate: {
                    startsWithSpace: (fieldValue) => {
                      const firstChar = fieldValue[0];

                      if (firstChar === " ") {
                        // return "Field must not start with a space";
                        return "signup-validation.lastnamecantstartwithspace";
                      }
                    },
                    hasSpaces: (fieldValue) => {
                      const fieldValueHasSpaces = hasSpaces(fieldValue);

                      if (fieldValueHasSpaces === true) {
                        return "signup-validation.lastnamecanthavespaces";
                      }
                    },
                    moreThenTwoChracters: (fieldValue) => {
                      if (fieldValue.length <= 2) {
                        return "signup-validation.lastnamemostbelongerthentwochracters";
                      }
                    },
                    hasNoNumbers: (fieldValue) => {
                      if (!hasNoNumbers(fieldValue)) {
                        return "signup-validation.lastnamecantcontianumbers";
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
          </div>

          <div id="lap-top-test-2">
            <div
              className={`form-control   ${dynamicClassForInputs}  ${laptopDaynamicClassName}`}
            >
              <label className="signup-labels" htmlFor="username">
                {t(`signup.userNameInputLabel`)}
              </label>
              <input
                className="signup-form-inputs"
                //disabled
                //prevent user from interacting with the filde
                type="text"
                id="username-password-input"
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

                        return "signup-validation.thisUserNameAlreadyExists";
                      }
                    },
                  },
                })}
              />
              {errors.username?.message && (
                <p className="error">{t(`${errors.username?.message}`)}</p>
              )}
            </div>

            <div
              className={`form-control   ${dynamicClassForInputs} ${laptopDaynamicClassName}`}
            >
              <label className="signup-labels" htmlFor="signup-Bday-input">
                {t(`signup.BdayInputLabel`)}
              </label>
              <input
                className="signup-form-inputs"
                type="date"
                id="signup-Bday-input"
                {...register("Bday", {
                  required: {
                    value: true,
                    message: "signup-validation.erorrDateOfBirthRequired",
                  },
                })}
              />
              {errors.Bday?.message && (
                <p className="error">{t(`${errors.Bday.message}`)}</p>
              )}
            </div>
          </div>

          <div
            className={`form-control   ${dynamicClassForInputs} ${laptopDaynamicClassName}`}
          >
            <label className="signup-labels" htmlFor="signup-email-input">
              {t(`signup.emailInputLabel`)}
            </label>
            <input
              className="signup-form-inputs"
              type="email"
              id="signup-email-input"
              {...register("email", {
                required: {
                  value: true,
                  message: "signup-validation.erorrEmailRequired",
                },
                validate: {
                  startsWithSpace: (fieldValue) => {
                    const firstChar = fieldValue[0];

                    if (firstChar === " ") {
                      // return "Field must not start with a space";
                      return "signup-validation.erorrstartsWithSpace";
                    }

                    // console.log(fieldValue);
                  },
                  emailFormatValdtion: (fieldValue) => {
                    if (!EmailValidator.validate(fieldValue)) {
                      return "signup-validation.IncorrectEmailFormat";
                    }
                  },
                  hasSpaces: (fieldValue) => {
                    const fieldValueHasSpaces = hasSpaces(fieldValue);

                    if (fieldValueHasSpaces === true) {
                      return "signup-validation.erorrFieldValueHasSpaces";
                    }
                  },
                },
              })}
            />
            {errors.email?.message && (
              <p className="error">{t(`${errors.email.message}`)}</p>
            )}
          </div>

          {/* <div
            className={`form-control   ${dynamicClassForInputs} ${laptopDaynamicClassName}`}
          >
            <label className="signup-labels" htmlFor="signup-Bday-input">
              {t(`signup.BdayInputLabel`)}
            </label>
            <input
              className="signup-form-inputs"
              type="date"
              id="signup-Bday-input"
              {...register("Bday", {
                required: {
                  value: true,
                  message: "signup-validation.erorrDateOfBirthRequired",
                },
              })}
            />
            {errors.Bday?.message && (
              <p className="error">{t(`${errors.Bday.message}`)}</p>
            )}
          </div> */}

          <div
            className={`form-control   ${dynamicClassForInputs} ${laptopDaynamicClassName}`}
          >
            <label className="signup-labels" htmlFor="signup-phonenumber-input">
              {t(`signup.phonenumberInputLabel`)}
            </label>
            <input
              className="signup-form-inputs"
              type="tel"
              id="signup-phonenumber-input"
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "signup-validation.phoneNumberRequired",
                },
                validate: {
                  startsWithSpace: (fieldValue) => {
                    const firstChar = fieldValue[0];

                    if (firstChar === " ") {
                      // return "Field must not start with a space";
                      return "signup-validation.phoneNumberCantStartWithSpace";
                    }
                  },
                  hasSpaces: (fieldValue) => {
                    const fieldValueHasSpaces = hasSpaces(fieldValue);
                    if (fieldValueHasSpaces === true) {
                      return "signup-validation.phoneNumberCantHaveSpaces";
                    }
                  },
                  hasLetters: (fieldValue) => {
                    if (hasLetters(fieldValue)) {
                      return "signup-validation.phoneNumberCantHaveLetters";
                    }
                  },
                },
              })}
            />
            {errors.phoneNumber?.message && (
              <p className="error">{t(`${errors.phoneNumber.message}`)}</p>
            )}
          </div>

          <div
            className={`form-control   ${dynamicClassForInputs} ${laptopDaynamicClassName}`}
          >
            <label className="signup-labels" htmlFor="email">
              {t(`signup.passWordInputLabel`)}
            </label>
            <input
              className="signup-form-inputs"
              type="text"
              id="signup-password-input"
              {...register("password", {
                required: {
                  value: true,
                  message: "signup-validation.erorrPasswordRequired",
                  // message:t(`signup-validation.erorrUsernameRequired`),
                },
                validate: {
                  isAtLeast8Characters: (fieldValue) => {
                    if (!isAtLeast8Characters(fieldValue)) {
                      return "signup-validation.PasswordMostBeAtleast8CharactersLong";
                    }
                  },
                  containsUppercaseLetter: (fieldValue) => {
                    if (!containsUppercaseLetter(fieldValue)) {
                      return "signup-validation.PasswordMostHaveAtLeastOneUppercaseLetter";
                    }
                  },
                  containsLowercaseLetter: (fieldValue) => {
                    if (!containsLowercaseLetter(fieldValue)) {
                      return "signup-validation.PasswordMostHaveAtLeastOneLowerCaseLetter";
                    }
                  },
                  containsDigit: (fieldValue) => {
                    if (!containsDigit(fieldValue)) {
                      return "signup-validation.PasswordMostHaveAtLeastOneDigit";
                    }
                  },
                  containsSpecialCharacter: (fieldValue) => {
                    if (!containsSpecialCharacter(fieldValue)) {
                      return "signup-validation.PasswordMostHaveAtLeastOneSpecialCharacter";
                    }
                  },
                  hasSpaces: (fieldValue) => {
                    const fieldValueHasSpaces = hasSpaces(fieldValue);
                    if (fieldValueHasSpaces === true) {
                      return "signup-validation.PasswordCantHaveSpaces";
                    }
                  },
                },
              })}
            />
            {errors.password?.message && (
              <p className="error">{t(`${errors.password.message}`)}</p>
            )}
          </div>

          <div id="signup-submit-button-container">
            <button id="signup-submit-button">{t(`signup.submit`)}</button>
          </div>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default SignUp;

//  At least 8 characters long.
//  Contains at least one uppercase letter.
//  Contains at least one lowercase letter.
//  Contains at least one digit.
//  Contains at least one special character (e.g., !, @, #, $, etc.).

// EXEC [dbo].[SIGNUP]
//     @First_Name = 'John',
//     @Last_Name = 'Doe',
//     @Email = 'john.doe@example.com',
//     @Phone_Number = '123-456-7890',
//     @Profile_Picture = 'some-url',
//     @Bday = '1990-01-01',
//     @User_Name = 'johndoe',
//     @Password = '1234',
// 	@User_Role_Type_Id = 1

// EXEC [dbo].[SIGNUP]
//     @First_Name = 'Jane',
//     @Last_Name = 'Smith',
//     @Email = 'jane.smith@example.com',
//     @Phone_Number = '123-456-7890',
//     @Profile_Picture = 'another-url',
//     @Bday = '1985-05-15',
//     @User_Name = 'janeSmith23',
//     @Password = '1234',
// 	@User_Role_Type_Id = 2

// EXEC [dbo].[SIGNUP]
//     @First_Name = 'Alice',
//     @Last_Name = 'Johnson',
//     @Email = 'alice.johnson@example.com',
//     @Phone_Number = '555-123-7890',
//     @Profile_Picture = 'image-url',
//     @Bday = '1980-12-10',
//     @User_Name = 'aliceJ',
//     @Password = '1234',
// 	@User_Role_Type_Id = 3;
