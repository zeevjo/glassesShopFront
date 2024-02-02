import { UserFullData } from "interfaces";
import React, { useContext, useEffect, useState } from "react";
import "./usercard.css";
import { customfetch } from "api";
import baseUrl from "constants/test/baseUrl";
import { getCookie } from "utils";
import { logInStore } from "contexts";
import { useTranslation } from "react-i18next";

interface UserCardProps {
  data: UserFullData;
}

//TODO: on click open card

const UserCard: React.FC<UserCardProps> = ({ data }) => {
  const { usersFullDataArr, setUsersFullDataArr } = useContext(logInStore);
  const [currUserType, setCurrUserType] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [t] = useTranslation("global");
  useEffect(() => {
    if (data.CustomerId) {
      // console.log("check", data);
      setCurrUserType("Customer");
    } else if (data.EmployeeId) {
      setCurrUserType("Employee");
    } else if (data.OwnerId) {
      setCurrUserType("Oner");
    }
  }, []);

  const updateUserRole = async ({ data }: UserCardProps) => {
    //get acsses to the user data
    console.log("selectedRole", data.User_Name, selectedRole);

    type UserRoleMapping = {
      [key: string]: number;
    };

    const userRoles: UserRoleMapping = {
      EMPLOYEE: 1,
      OWNER: 2,
      CUSTOMER: 3,
      // add other roles here if necessary
    };

    function getRoleId(user_role_name: string): number | undefined {
      return userRoles[user_role_name.toUpperCase()] || undefined;
    }

    if (selectedRole != "selectedRole" && selectedRole != "") {
      let response = await customfetch({
        url: `${baseUrl.loaclhost}/oner`,
        method: "PUT",
        headers: { Authorization: `Bearer ${getCookie("cookieJwtToken")}` },
        body: {
          User_Name: data.User_Name,
          User_Role_Type_Id: getRoleId(selectedRole),
        },
      });
      console.log("response up date user role", response);
    }

    try {
      const cookieJwtToken = getCookie("cookieJwtToken");
      let response: UserFullData[] = await customfetch({
        url: `${baseUrl.loaclhost}/user/getuserfulldataofallusers`,
        method: "GET",
        headers: {
          // Add custom headers here if needed
          Authorization: `Bearer ${cookieJwtToken}`,
        },
      });

      if (response) {
        const removeNulls = (arr: any[]) => {
          return arr.filter((item: null) => item !== null);
        };

        console.log("got all data from server users", removeNulls(response));

        setUsersFullDataArr(removeNulls(response));
      }

      setCurrUserType(`${selectedRole}`);
    } catch (error) {
      console.log("error in api call getuserfulldataofallusers", error);
    }
    //send api call to change user role
  };

  return (
    <div id="usercard-container">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className={`flip-card-front role-${data.User_Role_Type_Id}`}>
            <div className="img-profile-user-card-div">
              {data.First_Name} {data.Last_Name}
              {/* <div>{data.User_Name}</div> */}
            </div>
          </div>
          <div className={`${`flip-card-back`} role-${data.User_Role_Type_Id}`}>
            <div className="user-name">
              {t(`users.${currUserType}`)}
            </div>
            {/* <p>{data.Customer_Rank_Type}</p> */}
            {/* <p>{data.Sick_Days}</p>
            <p>{data.Days_Off}</p> */}

            <select
              className="user-role-select"
              onChange={(e) => setSelectedRole(e.target.value)}
              value={selectedRole}
            >
              <option value="" disabled>
                {t(`users.SelectRole`)}
              </option>
              <option value="Employee"> {t(`users.Employee`)}</option>
              <option value="Oner"> {t(`users.Oner`)}</option>
              <option value="Customer"> {t(`users.Customer`)}</option>
            </select>
            <button
              className="update-user-role-btn"
              onClick={() => {
                updateUserRole({ data });
              }}
            >
            {t(`users.UpdateUserRole`)} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
