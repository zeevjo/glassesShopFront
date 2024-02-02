import React from "react";
import { ContactLensesForm, CreditCard, Eyeglasses, FinalOrderDetails, Lenses, OrderinitialDetails, Sunglasses } from "components";
import { Route, Routes } from "react-router-dom";
import { Order } from "pages";

const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<OrderinitialDetails />} />
      <Route path="OrderinitialDetails" element={<OrderinitialDetails />} />
      <Route path="payment" element={<CreditCard />} />
      <Route path="FinalOrderDetails" element={<FinalOrderDetails />} />
    </Routes>
  );
};

export default OrderRoutes;
