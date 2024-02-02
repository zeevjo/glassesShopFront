import React, { useContext, useEffect, useState } from "react";
import {
  UserFullData,
  person,
  shopItem,
  shopItems,
  user,
  userRoleInterface,
} from "interfaces";
import { customfetch } from "api";
import { logInStore } from "contexts";
import { areAllFieldsTrue, getCookie } from "utils";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "../../constants";

interface test {
  setLoading: Function;
}

const Api: React.FC<test> = ({ setLoading }) => {
  const {
    setEyeGlassesData,
    setSunGlassesData,
    setColorData,
    logedIn,
    setUserData,
    userData,
    setPersonData,
    renderOnOreder,
    setApiUpdate,
    apiUpdate,
    eyeGlassesData,
    renderEyeglasses,
    renderSunglasses,
    onOnerlogsIn,
    setDashBordShopIsActive,
    usersFullDataArr,
    setUsersFullDataArr,
  } = useContext(logInStore);

  /**
   *for on oreder render api
   to show updated data
   */
  useEffect(() => {
    setGotAllData({
      EyeGlassesApi: false,
      SunGlassesApi: false,
      ColorApi: false,
      UserApi: true,
      PersonApi: true,
    });
    setEyeGlassesData([]);
    setSunGlassesData([]);
    setColorData([]);

    const didGetAllData = areAllFieldsTrue(gotAllData);

    if (didGetAllData) {
      //console.log(eyeGlassesData);

      setApiUpdate(!apiUpdate);
    }
  }, [renderOnOreder]);

  const [gotAllData, setGotAllData] = useState({
    EyeGlassesApi: false,
    SunGlassesApi: false,
    ColorApi: false,
    UserApi: false,
    PersonApi: false,
  });
  /**
   * GET Eyeglasses
   */

  useEffect(() => {
    (async () => {
      try {
        let response: shopItem[] = await customfetch({
          // url: `${baseUrl.loaclhost}/shop/Eyeglasses",

          //TO DO: change to base url baseUrl: `${baseUrl.loaclhost}`;
          url: `${baseUrl.loaclhost}/shop/Eyeglasses`,
          method: "GET",
        });
        //console.log("Got Eyeglasses From DB - IN API", response, baseUrl);
        setEyeGlassesData(response);
        if (response) {
          setGotAllData((prevData) => ({ ...prevData, EyeGlassesApi: true }));
        }
      } catch (error) {
        //console.log("error", error);
      }
    })();
  }, [renderOnOreder, renderEyeglasses]);

  /**
   * GET Sunglasses
   */
  useEffect(() => {
    (async () => {
      try {
        let response: shopItem[] = await customfetch({
          url: `${baseUrl.loaclhost}/shop/Sunglasses`,
          method: "GET",
        });
        ////console.log("Got Sunglasses From DB - IN API", response);
        setSunGlassesData(response);
        if (response) {
          setGotAllData((prevData) => ({ ...prevData, SunGlassesApi: true }));
        }
      } catch (error) {
        //console.log("error", error);
      }
    })();
  }, [renderOnOreder, renderSunglasses]);

  /**
   * GET Colors
   */
  useEffect(() => {
    (async () => {
      try {
        let response: [] = await customfetch({
          url: `${baseUrl.loaclhost}/Color/getAllColors`,
          method: "GET",
        });
        ////console.log("Got Colors From DB - IN API", response);
        setColorData(response);
        if (response) {
          setGotAllData((prevData) => ({ ...prevData, ColorApi: true }));
        }
      } catch (error) {
        //console.log("error", error);
      }
    })();
  }, [renderOnOreder]);

  /**
   * get all users data when the oner logs in
   */
  useEffect(() => {
    (async () => {
      if (logedIn) {
        const cookieJwtToken = getCookie("cookieJwtToken");

        let decodedToken: userRoleInterface;
        if (cookieJwtToken != undefined) {
          decodedToken = jwtDecode(cookieJwtToken);
          if (decodedToken.User_Role === 2) {
            setDashBordShopIsActive(true);
            try {
              let response: [] = await customfetch({
                url: `${baseUrl.loaclhost}/user/getuserfulldataofallusers`,
                method: "GET",
              });
              if (response) {
                console.log("response getuserfulldataofallusers", response);
              }
            } catch (error) {
              console.log("error", error);
            }
          }
        }
      }
    })();
  }, [onOnerlogsIn]);

  /**
   *
   * Get user full info
   */
  useEffect(() => {
    if (logedIn) {
      console.log("test11", logedIn);

      const cookieJwtToken = getCookie("cookieJwtToken");
      // //console.log("test1");

      if (cookieJwtToken != "undefined" && cookieJwtToken) {
        const decodedToken: userRoleInterface = jwtDecode(cookieJwtToken);
        console.log("decodedToken", decodedToken);

        if (decodedToken.User_Id && decodedToken.User_Name) {
          (async () => {
            try {
              let response: user = await customfetch({
                url: `${baseUrl.loaclhost}/user`,
                method: "POST",
                body: { User_Name: decodedToken.User_Name },
              });

              ////console.log("Got User-data From DB - IN API", response);
              setUserData(response);
              if (response) {
                setGotAllData((prevData) => ({ ...prevData, UserApi: true }));
              }
            } catch (error) {
              //console.log("error", error);
            }
          })();

          (async () => {
            try {
              let response: person = await customfetch({
                url: `${baseUrl.loaclhost}/user/getUesrFullPersonDataById`,
                method: "POST",
                body: { Id: decodedToken.User_Id },
              });

              // //console.log(
              //   "Got Pepole-Data-By-User-id From DB - IN API",
              //   response
              // );
              setPersonData(response);
              if (response) {
                setGotAllData((prevData) => ({ ...prevData, PersonApi: true }));
              }
            } catch (error) {
              //console.log("error", error);
            }
          })();
        }

        if (decodedToken.User_Role === 2 && logedIn) {
          console.log("oner was loged in::", decodedToken.User_Role);

          (async () => {
            try {
              const cookieJwtToken = getCookie("cookieJwtToken");

              let response: UserFullData[] = await customfetch({
                url: `${baseUrl.loaclhost}/user/getuserfulldataofallusers`,
                method: "GET",
                headers: {
                  // Add custom headers here if needed
                  Authorization: `Bearer ${cookieJwtToken}`,
                },
              });

              if (response) {
                const removeNulls = (arr: any[]) => {
                  return arr.filter((item: null) => item !== null);
                };

                console.log(
                  "got all data from server users",
                  removeNulls(response)
                );

                setUsersFullDataArr(removeNulls(response));
              }
            } catch (error) {
              console.log("error in api call getuserfulldataofallusers", error);
            }
          })();
        }
      }
    }
  }, [logedIn]);

  /**
   * Checks if got all data from db
   */
  useEffect(() => {
    const didGetAllData = areAllFieldsTrue(gotAllData);
    //console.log("gotAllData", gotAllData);
    //console.log("didGetAllData", didGetAllData);

    // Update the loading state in the App component
    if (didGetAllData) {
      //console.log("didGetAllData", didGetAllData);

      setLoading(false);
    }
  }, [gotAllData, setLoading]);

  return <></>;
};

export default Api;
