import { Footer, NavBar, Overlay } from "components";
import { CUSTOMER_NAV_ITEMS } from "../../constants";
import { Outlet } from "react-router-dom";
import { ClientRoutes } from "routes";

const Client = () => {
  return (
    <div>
      <NavBar navItems={CUSTOMER_NAV_ITEMS}></NavBar>
      <Overlay />
      <Outlet />
      <ClientRoutes />
      <Footer />
    </div>
  );
};
 
export default Client;