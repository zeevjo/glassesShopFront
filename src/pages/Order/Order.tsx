import React, { useContext, useEffect, useState } from "react";
import "./order.css";
import { logInStore } from "contexts";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { hasNoNumbers, hasSpaces } from "utils";
import { RxSlash } from "react-icons/rx";
import * as EmailValidator from "email-validator";
import "./order.css";
import { CreditCard } from "components";
import { Outlet } from "react-router-dom";
import { OrderRoutes } from "routes";

type orederType = {
  firstName: string;
  lastName: string;
  email: string;
  creditCardFullNum: string;
  creditCardExparyDateMonth: string;
  creditCardExparyDateYear: string;
  creditCardCvv: string;
};

const Order = () => {
  const { totalOrder, personData, logedIn, setlogedIn, setRenderOnOreder } = useContext(logInStore);
  const [defaultValues, setdefaultValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [t, i18n] = useTranslation("global");

  const form = useForm<orederType>({
    mode: "all",
    defaultValues: {
      firstName: personData?.First_Name,
      lastName: personData?.Last_Name,
      email: personData?.Email,
    },
    // defaultValues: defaultValues,
  });

  useEffect(() => {
    if (personData) {
      form.setValue("firstName", personData.First_Name);
      form.setValue("lastName", personData.Last_Name);
      form.setValue("email", personData.Email);
      setLoading(false);
    }
  }, [personData, form]);

  const [payment, setPayment] = useState(false);
  const [PersonalInformation, setPersonalInformation] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    getFieldState,
  } = form;

  const onSubmit = async (data: any) => {
    console.log("data", data);
    setPayment(true);
    setPersonalInformation(false);
  };

  const { errors } = formState;
  let dynamicClassForInputs: string = "";
  if (!errors.creditCardCvv?.message) {
    // console.log("!errors.password?.message", !errors.firstName?.message);
    dynamicClassForInputs = "dynamicClassForInputs";
  }

  if (loading) {
    // If data is still being fetched, show a loading spinner or indicator
    return <div>Loading...</div>; // Replace with your loading component
  }

  return (
    <div id="order-container">
      {/* <div id="order-title">{t("order.title")}</div> */}
      <Outlet />
      <OrderRoutes />
    </div>
  );
};

export default Order;
