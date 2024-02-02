import React, { useEffect } from "react";
import "./dashbordshop.css";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { DashBordShopRoutes, ShopRoutes } from "routes";
import { MdOutlineFilterList } from "react-icons/md";
import { useContext, useRef, useState } from "react";
import { log } from "console";
import { logInStore } from "contexts";
import { Eyeglasses, Filter, Sunglasses } from "components";
import { useScreenSize } from "hooks";
import { FaRegCircle } from "react-icons/fa6";
import { IoGlasses, IoGlassesOutline } from "react-icons/io5";
import { RiEye2Line } from "react-icons/ri";
import { Shop } from "pages";
import { userRoleInterface } from "interfaces";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "utils";

const DashBordShop = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const {
    setDisplayDispalyFilter,
    displayDispalyFilter,
    userData,
    renderSunglasses,
    setRenderSunglasses,
    renderEyeglasses,
    setRenderEyeglasses,
    dashBordShopIsActive,
    setDashBordShopIsActive,
  } = useContext(logInStore);

  useEffect(() => {
    const cookieJwtToken = getCookie("cookieJwtToken");

    let decodedToken: userRoleInterface;
    if (cookieJwtToken != undefined) {
      decodedToken = jwtDecode(cookieJwtToken);
      if (decodedToken.User_Role === 2) {
        setDashBordShopIsActive(true);
      } else {
        setDashBordShopIsActive(false);
      }
    } else {
      setDashBordShopIsActive(false);
    }

    return () => {
      // setDashBordShopIsActive(false);
      setRenderEyeglasses(!renderEyeglasses);
      setRenderSunglasses(!renderSunglasses);
    };
  }, []);

  let screenSize = useScreenSize();
  const navigate = useNavigate();

  const [hideContactLenses, setHideContactLenses] = useState(false);

  const clickHandel = (dataType: string) => {
    if (dataType === "Eyeglasses") {
      navigate("/dashboard/dashbordShop/Eyeglasses");
      setHideContactLenses(false);
      setRenderSunglasses(!renderSunglasses);
    }
    if (dataType === "Sunglasses") {
      navigate("/dashboard/dashbordShop/Sunglasses");
      setHideContactLenses(false);
      setRenderEyeglasses(!renderEyeglasses);
    }
    if (dataType === "ContactLenses") {
      navigate("/dashboard/dashbordShop/ContactLenses");
      setHideContactLenses(true);
    }
  };

  return (
    <div className={`dashbord-container-${language}`}>
      <div className={`dashbord-border-style-${language}`}>
        <div
          id="shop-container"
          style={{ marginTop: dashBordShopIsActive ? "0px" : "70px" }}
        >
          {screenSize.width <= 426 && (
            <div id="mobile-shop-display">
              {/* <Sunglasses /> */}
              {displayDispalyFilter && <Filter />}
              <Outlet />
              <DashBordShopRoutes />

              <div id="lower-nav-container">
                <div id="inner-lower-nav-container">
                  <RiEye2Line
                    className="shop-icons"
                    onClick={() => {
                      clickHandel("ContactLenses");
                    }}
                  />
                  <IoGlassesOutline
                    className="shop-icons"
                    onClick={() => {
                      clickHandel("Eyeglasses");
                    }}
                  />
                  <IoGlasses
                    className="shop-icons"
                    onClick={() => {
                      clickHandel("Sunglasses");
                    }}
                  />
                  {!hideContactLenses && (
                    <MdOutlineFilterList
                      className="shop-icons"
                      onClick={() => {
                        setDisplayDispalyFilter(true);
                      }}
                    ></MdOutlineFilterList>
                  )}
                </div>
              </div>
            </div>
          )}

          {screenSize.width <= 2000 && screenSize.width >= 427 && (
            <div id="tablet-laptop-shop-display">
              {displayDispalyFilter && <Filter />}
              <Outlet />
              <DashBordShopRoutes />

              <div id="lower-nav-container">
                <div id="inner-lower-nav-container">
                  <RiEye2Line
                    className="shop-icons"
                    onClick={() => {
                      clickHandel("ContactLenses");
                    }}
                  />
                  <IoGlassesOutline
                    className="shop-icons"
                    onClick={() => {
                      clickHandel("Eyeglasses");
                    }}
                  />
                  <IoGlasses
                    className="shop-icons"
                    onClick={() => {
                      clickHandel("Sunglasses");
                    }}
                  />
                  {!hideContactLenses && (
                    <MdOutlineFilterList
                      className="shop-icons"
                      onClick={() => {
                        setDisplayDispalyFilter(true);
                      }}
                    ></MdOutlineFilterList>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBordShop;
