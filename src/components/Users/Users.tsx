import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./users.css";
import { logInStore } from "contexts";
import { UserCard } from "components";
import { UserFullData } from "interfaces";
import { MdOutlineFilterList } from "react-icons/md";
import { RiEye2Line } from "react-icons/ri";
import { IoGlasses, IoGlassesOutline } from "react-icons/io5";

const Users: React.FC = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const { usersFullDataArr } = useContext(logInStore);

  const [usersToDisplay, setUsersToDisplay] = useState<UserFullData[]>([]);

  const [t] = useTranslation("global");


  useEffect(() => {
    setUsersToDisplay(usersFullDataArr);
  }, [usersFullDataArr]);

  const filterUsers = (
    filterType: "OwnerId" | "EmployeeId" | "CustomerId" | "all"
  ) => {
    if (filterType === "all") {
      setUsersToDisplay(usersFullDataArr);
      return;
    }

    const filteredUsers = usersFullDataArr.filter((user) => user[filterType]);
    setUsersToDisplay(filteredUsers);
  };

  const hasUsers = usersToDisplay.length > 0;
  console.log("usersToDisplay", usersToDisplay);

  const usersCards =
    usersToDisplay.length > 0 &&
    usersToDisplay.map((data) => <UserCard key={data.User_Name} data={data} />);

  return (
    <div className={`users-container-${language}`}>
      <div className={`users-border-style-${language}`}>
        <div id="users-gallry">
          {hasUsers ? usersCards : <p>No users to display.</p>}
        </div>
      </div>
      <div id="lower-nav-container">
        <div id="inner-lower-nav-container">
          <button
            className="users-nav-btns-employee employee-btn"
            onClick={() => filterUsers("EmployeeId")}
          >
          {t("users.Employees")}  
          </button>
          <button
            className="users-nav-btns-employee customer-btn"
            onClick={() => filterUsers("CustomerId")}
          >
          {t("users.Customers")}  
          </button>
          <button
            className="users-nav-btns-employee oner-btn"
            onClick={() => filterUsers("OwnerId")}
          >
          {t("users.Oner")}  
          </button>
          <button
            className="users-nav-btns-employee users-btn"
            onClick={() => filterUsers("all")}
          >
          {t("users.all")}  
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
