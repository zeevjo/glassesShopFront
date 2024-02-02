import React, { useEffect, useState } from "react";
import "./dashbordshopnavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaUsers } from "react-icons/fa";
import "./dashbordshopnavbar.css";

const DashBordNavBar = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const [activeDiv, setActiveDiv] = useState<number | null>(null);

  // Function to handle div click
  const handleClick = (divNumber: number) => {
    console.log("divNumber", divNumber, language);

    setActiveDiv(divNumber);
  };

  const navigate = useNavigate();
  const [t] = useTranslation("global");

  return (
    <div id={`dashbord-shop-navbar-container`}>
      <div
        className="dashbord-links-containers"
        id={`dashbord-users-link-container-${language}`}
        style={{
          zIndex: activeDiv === 1 ? 40 : 1,
          boxShadow:
            activeDiv === 1 && language === "en"
              ? "4px 0px 3px rgba(0, 0, 0, 0.5)"
              : "-4px 0px 3px rgba(0, 0, 0, 0.5)",
        }}
        onClick={() => {
          handleClick(1);
          navigate("/dashboard/Users");
        }}
      >
        <Link
          className="dashbord-links"
          id="dashbord-users-link"
          to={"/dashboard/Users"}
        >
          {t('dashBordNavBar.users')}
        </Link>
      </div>

      <div
        id={`dashbord-dashbordShop-link-container-${language}`}
        className="dashbord-links-containers"
        style={{
          zIndex: activeDiv === 2 ? 40 : 1,
          boxShadow:
            activeDiv === 2 && language === "en"
              ? "-4px 0px 3px rgba(0, 0, 0, 0.5)"
              : "4px 0px 3px rgba(0, 0, 0, 0.5)",
        }}
        onClick={() => {
          handleClick(2);
          navigate("/dashboard/dashbordShop/Eyeglasses");
        }}
      >
        <Link
          className="dashbord-links"
          id="dashbord-dashbordShop-link"
          to={"/dashboard/dashbordShop/Eyeglasses"}
        >
               {t('dashBordNavBar.dashbordShop')}  
               {/* <FaUsers id="Users-icon"/> */}
        </Link>
      </div>
    </div>
  );
};

export default DashBordNavBar;
