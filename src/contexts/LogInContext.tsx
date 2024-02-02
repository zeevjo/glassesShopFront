import { log } from "console";
import { UserFullData, person, shopItem, user } from "interfaces";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface logInTypeContext {
  logedIn: boolean;
  setlogedIn: Dispatch<SetStateAction<boolean>>;
  darkMode: string;
  setdarnMode: Dispatch<SetStateAction<string>>;
  cartArray: any[];
  setCartArray: Dispatch<SetStateAction<any[]>>;
  displayCart: boolean;
  setDispalyCart: Dispatch<SetStateAction<boolean>>;
  displayAccount: boolean;
  setDispalyAccount: Dispatch<SetStateAction<boolean>>;
  totalOrder: number;
  setTotalOrder: Dispatch<SetStateAction<number>>;
  eyeGlassesData: shopItem[];
  setEyeGlassesData: Dispatch<SetStateAction<shopItem[]>>;
  sunGlassesData: shopItem[];
  setSunGlassesData: Dispatch<SetStateAction<shopItem[]>>;
  colorData: any[];
  setColorData: Dispatch<SetStateAction<any[]>>;
  userData: user;
  setUserData: Dispatch<SetStateAction<user>>;
  personData: person;
  setPersonData: Dispatch<SetStateAction<person>>;
  renderOnOreder: boolean;
  setRenderOnOreder: Dispatch<SetStateAction<boolean>>;
  apiUpdate: boolean;
  setApiUpdate: Dispatch<SetStateAction<boolean>>;
  userRole: string;
  setUserRole: Dispatch<SetStateAction<string>>;
  displayDispalyFilter: boolean;
  setDisplayDispalyFilter: Dispatch<SetStateAction<boolean>>;
  selectedColorsForFilter: string[];
  setSelectedColorsForFilter: Dispatch<SetStateAction<string[]>>;
  cartStorageChange: boolean;
  setCartStorageChange: Dispatch<SetStateAction<boolean>>;
  displayHamburger: boolean;
  setDisplayHamburger: Dispatch<SetStateAction<boolean>>;
  dashBordShopIsActive: boolean;
  setDashBordShopIsActive: Dispatch<SetStateAction<boolean>>;
  renderSunglasses: boolean;
  setRenderSunglasses: Dispatch<SetStateAction<boolean>>;
  renderEyeglasses: boolean;
  setRenderEyeglasses: Dispatch<SetStateAction<boolean>>;
  onOnerlogsIn: boolean;
  setOnOnerlogsIn: Dispatch<SetStateAction<boolean>>;
  usersFullDataArr: UserFullData[];
  setUsersFullDataArr: Dispatch<SetStateAction<UserFullData[]>>;
  cilintUserName: string;
  setCilintUserName: Dispatch<SetStateAction<string>>;
  ciintFullData: user;
  setCiintFullData: Dispatch<SetStateAction<user>>;
}

export const logInStore = createContext<logInTypeContext>({
  logedIn: false,
  setlogedIn: () => {},
  darkMode: "DarkMode",
  setdarnMode: () => {},
  cartArray: [],
  setCartArray: () => {},
  displayCart: false,
  setDispalyCart: () => {},
  displayAccount: false,
  setDispalyAccount: () => {},
  totalOrder: 0,
  setTotalOrder: () => {},
  eyeGlassesData: [],
  setEyeGlassesData: () => {},
  sunGlassesData: [],
  setSunGlassesData: () => {},
  colorData: [],
  setColorData: () => {},
  userData: {
    Created_At: "",
    Id: 0,
    Password: "",
    People_Id: 0,
    User_Name: "",
    User_Role_Type_Id: 0,
  },
  setUserData: () => {},
  personData: {
    Id: 0,
    First_Name: "",
    Last_Name: "",
    Email: "",
    Phon_Number: "",
    Profile_Picture: "",
    Bday: "",
    Created_At: "",
  },
  setPersonData: () => {},
  renderOnOreder: false,
  setRenderOnOreder: () => {},
  apiUpdate: false,
  setApiUpdate: () => {},
  userRole: "",
  setUserRole: () => {},
  displayDispalyFilter: false,
  setDisplayDispalyFilter: () => {},
  selectedColorsForFilter: [],
  setSelectedColorsForFilter: () => {},
  cartStorageChange: false,
  setCartStorageChange: () => {},
  displayHamburger: true,
  setDisplayHamburger: () => {},
  dashBordShopIsActive: false,
  setDashBordShopIsActive: () => {},
  renderSunglasses: false,
  setRenderSunglasses: () => {},
  renderEyeglasses: false,
  setRenderEyeglasses: () => {},
  onOnerlogsIn: false,
  setOnOnerlogsIn: () => {},
  usersFullDataArr: [],
  setUsersFullDataArr: () => {},
  cilintUserName: "",
  setCilintUserName: () => {},
  ciintFullData: {
    Created_At: "",
    Id: 0,
    Password: "",
    People_Id: 0,
    User_Name: "",
    User_Role_Type_Id: 0,
  },
  setCiintFullData: () => {},
});

export const DataProvider = (props: { children: ReactNode }) => {
  const [logedIn, setlogedIn] = useState(false);
  const [darkMode, setdarnMode] = useState("DarkMode");
  const [cartArray, setCartArray] = useState<
    Array<{ key: string; value: any }>
  >([]);
  const [displayCart, setDispalyCart] = useState(false);
  const [displayAccount, setDispalyAccount] = useState(false);
  const [totalOrder, setTotalOrder] = useState(0);
  const [eyeGlassesData, setEyeGlassesData] = useState<shopItem[]>([]);
  const [sunGlassesData, setSunGlassesData] = useState<shopItem[]>([]);
  const [colorData, setColorData] = useState<any[]>([]);
  const [userData, setUserData] = useState<user>({
    Created_At: "",
    Id: 0,
    Password: "",
    People_Id: 0,
    User_Name: "",
    User_Role_Type_Id: 0,
  });
  const [personData, setPersonData] = useState<person>({
    Id: 0,
    First_Name: "",
    Last_Name: "",
    Email: "",
    Phon_Number: "",
    Profile_Picture: "",
    Bday: "",
    Created_At: "",
  });
  const [renderOnOreder, setRenderOnOreder] = useState(false);
  const [apiUpdate, setApiUpdate] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [displayDispalyFilter, setDisplayDispalyFilter] = useState(false);
  const [selectedColorsForFilter, setSelectedColorsForFilter] = useState<
    string[]
  >([]);
  const [cartStorageChange, setCartStorageChange] = useState(false);
  const [displayHamburger, setDisplayHamburger] = useState(true);
  const [dashBordShopIsActive, setDashBordShopIsActive] = useState(false);

  const [renderSunglasses, setRenderSunglasses] = useState(false);
  const [renderEyeglasses, setRenderEyeglasses] = useState(false);
  const [onOnerlogsIn, setOnOnerlogsIn] = useState(false);
  const [usersFullDataArr, setUsersFullDataArr] = useState<UserFullData[]>([]);
  const [cilintUserName, setCilintUserName] = useState("");
  const [ciintFullData, setCiintFullData] = useState<user>({
    Created_At: "",
    Id: 0,
    Password: "",
    People_Id: 0,
    User_Name: "",
    User_Role_Type_Id: 0,
  });

  console.log("logedIn", logedIn);

  useEffect(() => {
    console.log("dashBordShopIsActive", dashBordShopIsActive);
  }, [dashBordShopIsActive]);

  return (
    <logInStore.Provider
      value={{
        logedIn,
        setlogedIn,
        darkMode,
        setdarnMode,
        cartArray,
        setCartArray,
        displayCart,
        setDispalyCart,
        displayAccount,
        setDispalyAccount,
        totalOrder,
        setTotalOrder,
        eyeGlassesData,
        setEyeGlassesData,
        sunGlassesData,
        setSunGlassesData,
        colorData,
        setColorData,
        userData,
        setUserData,
        personData,
        setPersonData,
        renderOnOreder,
        setRenderOnOreder,
        apiUpdate,
        setApiUpdate,
        userRole,
        setUserRole,
        displayDispalyFilter,
        setDisplayDispalyFilter,
        selectedColorsForFilter,
        setSelectedColorsForFilter,
        cartStorageChange,
        setCartStorageChange,
        displayHamburger,
        setDisplayHamburger,
        dashBordShopIsActive,
        setDashBordShopIsActive,
        renderSunglasses,
        setRenderSunglasses,
        renderEyeglasses,
        setRenderEyeglasses,
        onOnerlogsIn,
        setOnOnerlogsIn,
        usersFullDataArr,
        setUsersFullDataArr,
        cilintUserName,
        setCilintUserName,
        ciintFullData,
        setCiintFullData,
      }}
    >
      {props.children}
    </logInStore.Provider>
  );
};
