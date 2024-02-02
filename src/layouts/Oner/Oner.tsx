import { Footer, NavBar, Overlay } from "components";
import { ONER_NAV_ITEMS } from "../../constants";
import { Outlet } from "react-router-dom";
import { OnerRoutes } from "routes";

const Oner = () => {
  return (
    <div>
      <NavBar navItems={ONER_NAV_ITEMS}></NavBar>
      <Overlay />
      <Outlet />
      <OnerRoutes />
      <Footer />
    </div>
  );
};

export default Oner;
