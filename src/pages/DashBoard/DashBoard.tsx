import { DashBordNavBar, DashBordShop, Users } from "components";
import "./dashbord.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { DashBordRouts } from "routes";

const DashBoard = () => {
  return (
    <div id="dashboard-contanir">
      <DashBordNavBar />
      <Outlet />
      <DashBordRouts />
    </div>
  );
};

export default DashBoard;
