import { Footer, NavBar, Overlay } from "components";
import { EMPLOYEE_NAV_ITEMS } from "../../constants";
import { Outlet } from "react-router-dom";
import { OnerRoutes } from "routes";

const Employee = () => {
  return (
    <div>
      <NavBar navItems={EMPLOYEE_NAV_ITEMS}></NavBar>
      <Overlay />
      <Outlet />
      <OnerRoutes />
      <Footer />
    </div>
  );
};

export default Employee;
