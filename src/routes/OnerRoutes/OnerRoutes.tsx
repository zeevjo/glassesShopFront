import { ItemFullDetailes, Login, SignUp } from "components";
import { ONER_NAV_ITEMS } from "../../constants";
import { logInStore } from "contexts";
import { DashBoard, Home, Order, Shop, Story } from "pages";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

const OnerRoutes = () => {
  const { logedIn } = useContext(logInStore);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home navItems={ONER_NAV_ITEMS}></Home>} />
        <Route path="/home" element={<Home navItems={ONER_NAV_ITEMS}></Home>} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/order/*" element={<Order />} />
        <Route path="/story" element={<Story />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/dashboard/*" element={<DashBoard />} />
        <Route
          path="/shop/:dataCategory/:modelName/:selectedDisplayColor"
          element={<ItemFullDetailes />}
        />
        {!logedIn && <Route path="/account" element={<Login />} />}
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default OnerRoutes;
