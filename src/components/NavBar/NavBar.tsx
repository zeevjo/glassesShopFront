import React, { useContext, useEffect, useState } from "react";
import { navbarProps } from "interfaces";
import { getNavItemByTranslationKey, getShoppingCartLocalStorage } from "utils";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useScreenSize } from "hooks";
import { MdClose } from "react-icons/md";
import { AiOutlineLine, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import "./navbar.css";
import { log } from "console";
import { logInStore } from "contexts";
import { Cart } from "components";
import { Account } from "pages";
import { useCartLength } from "hooks";
const NavBar: React.FC<navbarProps> = ({ navItems }) => {
  // console.log(navItems);

  const cartLength = useCartLength("Cart");

  console.log("mycartdsds", cartLength);

  const [t, i18n] = useTranslation("global");
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const [mobileOrTablet, setMobileOrTablet] = useState(false);
  const [accountDynamicNavSection, setAccountDynamicNavSection] = useState("");
  const [laptop, setLaptop] = useState(false);
  const location = useLocation();
  const {
    displayCart,
    setDispalyCart,
    displayAccount,
    setDispalyAccount,
    logedIn,
    setlogedIn,
    displayHamburger,
    setDisplayHamburger,
    cartStorageChange,
    setCartStorageChange,
  } = useContext(logInStore);

  // const [userIcon, setUserIcon] = useState(false);
  let screenSize = useScreenSize();
  const navigate = useNavigate();
  // console.log(screenSize);

  const language = i18n.language;

  const [numOfItemsInCart, setNumOfItemsInCart] = useState(0);

  useEffect(() => {
    let cartArr = getShoppingCartLocalStorage();
    const highestIndex = cartArr.length;
    if (highestIndex === -1) {
      setNumOfItemsInCart(0);
    } else {
      setNumOfItemsInCart(highestIndex);
    }
  }, []);
  useEffect(() => {
    // console.log("a");

    if (screenSize.width <= 768) {
      setMobileOrTablet(true);
    } else {
      setMobileOrTablet(false);
    }
  }, [screenSize.width]);

  useEffect(() => {
    // console.log("b");
    if (screenSize.width >= 769) {
      setLaptop(true);
      setAccountDynamicNavSection("accountDynamicNavSection");
      // handelHebCss(language);
    } else {
      setLaptop(false);
      setAccountDynamicNavSection("");
    }
  }, [screenSize.width]);

  useEffect(() => {
    if (displayHamburger === true) {
      handelLinkClick();
      setDisplayHamburger(true);
    }
  }, [displayHamburger]);

  useEffect(() => {
    // console.log("c");

    if (language === "heb") {
      // console.log("1", language);
      // handelHebCss(language);
    } else if (language === "en") {
      // console.log("2", language);
      // handelHebCss(language);
    }
  }, [language]);

  //const cartHrefStr = "/cart";

  const userHrefStr = "/account";

  const homeHrefStr = "/home";

  const hndalChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const hendelMenuClick = () => {
    const container = document.getElementById("phon-tablet-display-container");

    if (container) {
      if (language === "heb") {
        container.style.removeProperty("left");
        container.style.display = "flex";
        container.style.right = "0";
        setTimeout(() => {
          container.style.width = "90%";
        }, 10);
      } else if (language === "en") {
        container.style.display = "flex";
        container.style.left = "0";
        setTimeout(() => {
          container.style.width = "90%";
        }, 10);
      }

      setDisplayHamburger((prevDisplayCart) => !prevDisplayCart);
    }
  };

  const handelLinkClick = () => {
    const container = document.getElementById("phon-tablet-display-container");
    // console.log("test test test", container);

    if (container) {
      // container.style.display = "none";
      container.style.width = "0%";
      setTimeout(() => {
        container.style.display = "none";
      }, 400);

      setDisplayHamburger((prevDisplayCart) => !prevDisplayCart);
    }
  };

  //////////////////////////////////////////

  let navSections = navItems.map((curr, i) => {
    if (curr.translateJsonKey === "account") {
      return (
        <Link
          id={`${accountDynamicNavSection}`}
          key={i}
          className="nav-links"
          to={curr.hrefStr}
          onClick={handelLinkClick}
        >
          {/* <FaUser id="account-icon"/> add icon to spesefc curr */}
          {t(`navbar.${curr.translateJsonKey}`)}
        </Link>
      );
    } else {
      return (
        <Link
          key={i}
          className="nav-links"
          to={curr.hrefStr}
          onClick={handelLinkClick}
        >
          {t(`navbar.${curr.translateJsonKey}`)}
        </Link>
      );
    }
  });

  const toggleCart = () => {
    setDispalyCart(!displayCart);
    setCartStorageChange(!cartStorageChange);
  };

  const toggleAccount = () => {
    console.log("/account");
    console.log("displayAccount", displayAccount);
    if (logedIn === true) {
      setDispalyAccount(!displayAccount);
    }
    if (logedIn === false) {
      // setDispalyAccount(!displayAccount);
      navigate("/account");
    }
  };

  return (
    <div className="nav-container">
      {mobileOrTablet && (
        <div id="mobile-tablet-container">
          <div className="hamburger-and-search-container">
            <div id="design-assistant-one">
              {displayHamburger && (
                <AiOutlineMenu
                  onClick={() => {
                    hendelMenuClick();
                    // setHamburgerClick(!hamburgerClick);
                  }}
                  id="hamburger-icon"
                />
              )}
              <BiSearch className="search-icon" />
            </div>
          </div>

          <div id="phon-tablet-display-container">
            <MdClose
              id="close-icon"
              onClick={() => {
                handelLinkClick();
                // if (logedIn === false) {
                //   navigate("/account");
                // }
              }}
            />
            {navSections}
          </div>

          <Link to={homeHrefStr} id="logo">
            JOSEPH
          </Link>

          <div id="cart-translate-icon-container">
            <div id="design-assistant-two">
              <div id="translate-div">
                <div
                  onClick={() => {
                    hndalChangeLanguage("en");
                  }}
                  className="en"
                >
                  EN
                </div>
                <AiOutlineLine id="pip" />
                <div
                  onClick={() => {
                    hndalChangeLanguage("heb");
                  }}
                  className="heb"
                >
                  HEB
                </div>
              </div>
              <Link className="cart-link" to={location.pathname}>
                <AiOutlineShoppingCart id="cart-icon" onClick={toggleCart} />
                {/* <div id={`number-of-items-in-cart-mobile-tblet-${language}`}>
                  {cartLength}
                </div> */}
                {/* <div id="numof-items-in-cart">{numOfItemsInCart}</div> */}
              </Link>

              <div
                id={"user-link-container"}
                onClick={() => {
                  toggleAccount();
                }}
              >
                <Link
                  id={"user-link"}
                  to={location.pathname}
                  // onClick={() => {
                  //   toggleAccount();
                  // }}
                >
                  <FaCircleUser
                    id="user-icon"
                    // onClick={() => {
                    //   toggleAccount();
                    // }}
                  />
                </Link>
              </div>
            </div>
          </div>
          <Cart />
          <Account />
        </div>
      )}

      {laptop && (
        <div id="laptop-container">
          <Link to={homeHrefStr} id="logo-search-container">
            <div id="design-assistant-one">
              <div id="logo">
                JOSEPH
                <BiSearch className="search-icon" />
              </div>
            </div>
          </Link>

          <div id="laptop-nav-items"> {navSections}</div>

          <div id="cart-translate-icon-container">
            <div id="design-assistant-two">
              <div id="translate-div">
                <div
                  onClick={() => {
                    hndalChangeLanguage("en");
                  }}
                  className="en"
                >
                  EN
                </div>
                <AiOutlineLine id="pip" />
                <div
                  onClick={() => {
                    hndalChangeLanguage("heb");
                  }}
                  className="heb"
                >
                  HEB
                </div>
              </div>
              <Link className="cart-link" to={location.pathname}>
                <AiOutlineShoppingCart id="cart-icon" onClick={toggleCart} />

                {/* <div id={`number-of-items-in-cart-${language}`}>
                  {cartLength}
                </div> */}
              </Link>

              <div
                id={"user-link-container"}
                onClick={() => {
                  toggleAccount();
                }}
              >
                <Link
                  id={"user-link"}
                  to={location.pathname}
                  onClick={() => {
                    toggleAccount();
                  }}
                >
                  <FaCircleUser id="user-icon" />
                </Link>
              </div>
            </div>
          </div>
          <Cart />
          <Account />
        </div>
      )}
    </div>
  );
};

export default NavBar;
