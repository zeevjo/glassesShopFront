import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Client, Employee, Oner } from "./layouts";
import { getCookie, deleteCookie, setCookie } from "utils";
import userRols from "constants";
import { userRoleInterface } from "interfaces";
import { logInStore } from "contexts";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import { Api, Loading } from "components";
import { FaGlasses } from "react-icons/fa6";
import baseUrl from "../src/constants/test/baseUrl";
import { customfetch } from "api";
import { Http2ServerResponse } from "http2";

function App() {
  const {
    i18n: { language },
  } = useTranslation();

  const {
    logedIn,
    setlogedIn,
    renderOnOreder,
    userRole,
    setUserRole,
    setDashBordShopIsActive,
  } = useContext(logInStore);
  // const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  function mapUserRole(roleValue: number) {
    for (const role in userRols) {
      if (userRols[role as keyof typeof userRols] === roleValue) {
        return role as keyof typeof userRols;
      }
    }
    return null; // Return null or a default role if not found
  }

  useEffect(() => {
    //delete jwt evrey time you refresh thre page
    //deleteCookie("cookieJwtToken");
    // Check if the JWT token exists in cookies
    const cookieJwtToken = getCookie("cookieJwtToken");
    // console.log("is there a jwt on the first render of app", cookieJwtToken);
    // console.log(typeof cookieJwtToken);
    (async () => {
      try {
        let response = await customfetch({
          url: `${baseUrl.loaclhost}/authenticated`,
          method: "GET",
          headers: { Authorization: `Bearer ${cookieJwtToken}` },
        });

        console.log("response1212", response);

        if (response) {
          if (cookieJwtToken != "undefined") {
            console.log("cookieJwtToken1", cookieJwtToken);

            if (cookieJwtToken) {
              const decodedToken: userRoleInterface = jwtDecode(cookieJwtToken);
              console.log("decodedToken", decodedToken);

              if (decodedToken && decodedToken.User_Role) {
                const userRole = mapUserRole(decodedToken.User_Role);

                console.log("userRole", userRole);

                if (userRole) {
                  setUserRole(userRole);
                  console.log("check2");
                  setlogedIn(true);
                }
              }
            }
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    // console.log("context use effect");
    const cookieJwtToken = getCookie("cookieJwtToken");
    // console.log("jwtToken context use effect", cookieJwtToken);
    // console.log(typeof cookieJwtToken);
    if (cookieJwtToken != "undefined") {
      if (cookieJwtToken) {
        const decodedToken: userRoleInterface = jwtDecode(cookieJwtToken);

        if (decodedToken && decodedToken.User_Role) {
          const userRole = mapUserRole(decodedToken.User_Role);

          if (userRole) {
            setUserRole(userRole);
          }
        }
      }
    }

    renderLayoutBasedOnRole();
  }, [logedIn]);

  // Define a function to render the appropriate layout based on user role
  const renderLayoutBasedOnRole = () => {
    if (loading) {
      // Show loading spinner or wheel
      return <Loading />;
    }

    if (logedIn && userRole === "owner") {
      return <Oner />;
    } else if (userRole === "customer") {
      return <Client />;
    } else if (logedIn && userRole === "employee") {
      return <Employee />;
    } else {
      return <Client />;
    }
  };

  return (
    <div className={`app-container ${language}`}>
      <Api setLoading={setLoading} />
      {renderLayoutBasedOnRole()}
    </div>
  );
}

export default App;