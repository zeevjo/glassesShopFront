import { logInStore } from "contexts";
import React, { useContext } from "react";
import "./overlay.css";

const Overlay = () => {
  const {
    displayCart,
    setDispalyCart,
    displayAccount,
    setDispalyAccount,
    displayDispalyFilter,
    setDisplayDispalyFilter,
    displayHamburger,
    setDisplayHamburger,
  } = useContext(logInStore);
  return (
    <>
      {(displayCart && (
        <div
          className="overlay"
          onClick={() => {
            setDispalyCart((prevDisplayCart) => !prevDisplayCart);
          }}
        ></div>
      )) ||
        (displayAccount && (
          <div
            className="overlay"
            onClick={() => {
              setDispalyAccount((prevDisplayCart) => !prevDisplayCart);
            }}
          ></div>
        )) ||
        (displayDispalyFilter && (
          <div
            className="overlay"
            onClick={() => {
              setDisplayDispalyFilter((prevDisplayCart) => !prevDisplayCart);
            }}
          ></div>
        )) ||
        (!displayHamburger && (
          <div
            className="overlay"
            onClick={() => {
              setDisplayHamburger((prevDisplayCart) => !prevDisplayCart);
            }}
          ></div>
        ))}
    </>
  );
};

export default Overlay;
