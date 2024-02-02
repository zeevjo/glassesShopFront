import { logInStore } from "contexts";
import React, { useContext, useEffect, useState } from "react";
import "./account.css";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { clearShoppingCartLocalStorage, deleteCookie, getCookie } from "utils";
import { jwtDecode } from "jwt-decode";
import { userRoleInterface } from "interfaces";
import userImg from '../../assets/showcase/thumbnail.avif';

const Account = () => {
  const {
    displayAccount,
    setDispalyAccount,
    logedIn,
    setlogedIn,
    userData,
    setUserRole,
    cartStorageChange,
    setCartStorageChange,
    setDashBordShopIsActive,
    personData
  } = useContext(logInStore);

  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const {
    i18n: { language },
  } = useTranslation();

  const toggleAccount = (closeIconClicked: boolean) => {
    setDispalyAccount(!displayAccount);

    if (closeIconClicked) {
      // navigate(-1);
    }
  };

  useEffect(() => {
    if (displayAccount === true) {
      toggleAccount(false);
    }
  }, []);

  console.log("personData", personData);
  

  const logout = () => {
    deleteCookie("cookieJwtToken");
    setlogedIn(false);
    toggleAccount(true);
    navigate("/home");
    setUserRole("customer");
    clearShoppingCartLocalStorage();
    setCartStorageChange(!cartStorageChange);
    setDashBordShopIsActive(false);
  };

  return (
    <div
      className={`account-container-${language}${
        displayAccount ? ` active-${language}` : ""
      }`}
    >
      <div id="cart-colse-container">
        <MdClose
          onClick={() => {
            toggleAccount(true);
          }}
        />
      </div>
      <img id="account-user-img" src={userImg} alt="user img" />
      {<div id="account-user-full-name">{personData.First_Name} {personData.Last_Name}</div>}
      <button id="account-log-out-btn" onClick={logout}>{t(`account.logout`)}</button>
    </div>
  );
};

export default Account;