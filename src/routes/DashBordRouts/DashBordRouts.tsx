import { DashBordShop, Eyeglasses, Users } from "components";
import React from "react";
import { Route, Routes } from "react-router-dom";

const dashbordrouts = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBordShop />} />
      <Route path="dashbordShop/*" element={<DashBordShop />} />
      <Route path="Users" element={<Users />} />
      {/* <Route path="dashbordShop/Eyeglasses" element={<Eyeglasses />} /> */}
    </Routes>
  );
};

export default dashbordrouts;
