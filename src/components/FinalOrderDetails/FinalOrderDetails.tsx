import React from "react";
import "./finalOrderDetails.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const FinalOrderDetails = () => {
  const [t] = useTranslation("global");

  const navgiate = useNavigate();

  const handelClick = () => {
    navgiate("/shop");
  };
  return (
    <div id="finalOrderDetails-contanier">
      <div id="tnx">{t("finalOrderDetails.tnxtext")}</div>
      <button id="keep-shopping-btn" onClick={handelClick}>
        {t("finalOrderDetails.keepshopping")}
      </button>
      {/* <Link to={"/shop"}>tets</Link> */}
    </div>
  );
};

export default FinalOrderDetails;
