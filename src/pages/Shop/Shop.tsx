import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShopRoutes } from "routes";
import { MdOutlineFilterList } from "react-icons/md";
import "./shop.css";
import { useContext, useEffect, useRef, useState } from "react";
import { log } from "console";
import { logInStore } from "contexts";
import { Filter } from "components";
import { useScreenSize } from "hooks";
import { FaRegCircle } from "react-icons/fa6";
import { IoGlasses, IoGlassesOutline } from "react-icons/io5";
import { RiEye2Line } from "react-icons/ri";

const Shop = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const {
    setDisplayDispalyFilter,
    displayDispalyFilter,
    userData,
    dashBordShopIsActive,
    setDashBordShopIsActive
  } = useContext(logInStore);
  const {
    i18n: { language },
  } = useTranslation();

  const [hideContactLenses, setHideContactLenses] = useState(false);

  const userRols = {
    employee: 1,
    owner: 2,
    customer: 3,
  };

  let screenSize = useScreenSize();

  useEffect(() => {
    setDashBordShopIsActive(false);
  }, [])

  const clickHandel = (dataType: string) => {
    if (dataType === "Eyeglasses") {
      navigate("/shop/Eyeglasses");
      setHideContactLenses(false);
    }
    if (dataType === "Sunglasses") {
      navigate("/shop/Sunglasses");
      setHideContactLenses(false);
    }
    if (dataType === "ContactLenses") {
      navigate("/shop/ContactLenses");
      setHideContactLenses(true);
    }
  };

  // console.log("displayDispalyFilter", displayDispalyFilter);

  return (
    <div
      id="shop-container"
      style={{ marginTop: dashBordShopIsActive ? "0px" : "70px" }}
    >
      {screenSize.width <= 426 ? (
        <>
          <div id="mobile-shop-display">
            {displayDispalyFilter && <Filter />}
            <Outlet />
            <ShopRoutes />

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
        </>
      ) : null}

      {screenSize.width <= 2000 && screenSize.width >= 427 ? (
        <div id="tablet-laptop-shop-display">
          {displayDispalyFilter && <Filter />}
          <Outlet />
          <ShopRoutes />
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
      ) : null}
    </div>
  );
};

export default Shop;
