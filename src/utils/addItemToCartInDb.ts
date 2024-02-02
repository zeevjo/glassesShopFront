import { customfetch } from "api";
import { getCookie } from "./cookies";
import { shopItem } from "interfaces";
import  {baseUrl}  from "../constants";

type contactLensType = {
  Id: number;
  Price: number;
  Cylinder_Id: number;
  Prescription_Strength_Id: number;
  Expiry_Date_Id: number;
  Brand_Id: number;
  Image: number;
};

type lensessType = {
  Brand_Id: number;
  Cylinder_Id: number;
  Id: number;
  Image: number;
  Lens_Coating_id: number;
  Prescription_Strength_Id: number;
  Price: number;
  Thickness_Id: number;
};

export async function addItemToCartInDb(item: any) {
  if (item.glassID) {
    const addItemToCartUrl = `${baseUrl.loaclhost}/cart/addItemToCart/Glasses/${item.glassID}`;
    const cookieJwtToken = getCookie("cookieJwtToken");
    // console.log("cookieJwtToken", cookieJwtToken);

    try {
      let response: shopItem[] = await customfetch({
        url: addItemToCartUrl,
        method: "GET",
        headers: {
          // Add custom headers here if needed
          Authorization: `Bearer ${cookieJwtToken}`,
        },
      });
      console.log("response", response);
    } catch (error) {
      // console.log("error", error);
      //setlogedIn(false);
    }
  }

  if (item.thickness) {
    const addItemToCartUrl = `${baseUrl.loaclhost}/shop/GetLensesByDetails`;
    const cookieJwtToken = getCookie("cookieJwtToken");
    //console.log("cookieJwtToken", cookieJwtToken);

    try {
      let response: lensessType = await customfetch({
        url: addItemToCartUrl,
        method: "POST",
        body: {
          Lens_Coating_Name: item.lensCoating,
          Thickness_Size: item.thickness,
          Cylinder_Size: item.cylinder,
          Prescription_Strength_Size: item.prescriptionStrength,
        },
      });
      console.log(response);
      // setDatacategory(response[0].Category)

      if (response) {
        try {
          const addItemToCartUrl = `${baseUrl.loaclhost}/cart/addItemToCart/Lenses/${response.Id}`;
          const cookieJwtToken = getCookie("cookieJwtToken");
          console.log("cookieJwtToken", cookieJwtToken);

          try {
            let response = await customfetch({
              url: addItemToCartUrl,
              method: "GET",
              headers: {
                // Add custom headers here if needed
                Authorization: `Bearer ${cookieJwtToken}`,
              },
            });
            console.log(response);
            // setDatacategory(response[0].Category)
          } catch (error) {
            console.log("error", error);
            //setlogedIn(false);
          }
        } catch (error) {}
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  if (item.ExpiryDate && item.cylinder && item.prescriptionStrength) {
    const addItemToCartUrl = `${baseUrl.loaclhost}/shop/GetContactLensesByDetails`;
    const cookieJwtToken = getCookie("cookieJwtToken");
    console.log("cookieJwtToken", cookieJwtToken);

    try {
      let response: contactLensType = await customfetch({
        url: addItemToCartUrl,
        method: "POST",
        body: {
          Expiry_Date_Name: item.ExpiryDate,
          Cylinder_Size: item.cylinder,
          Prescription_Strength_Size: item.prescriptionStrength,
        },
      });
      console.log(response);
      // setDatacategory(response[0].Category)

      if (response) {
        try {
          const addItemToCartUrl = `${baseUrl.loaclhost}/cart/addItemToCart/Contact_Lenses/${response.Id}`;
          const cookieJwtToken = getCookie("cookieJwtToken");
          console.log("cookieJwtToken", cookieJwtToken);

          try {
            let response = await customfetch({
              url: addItemToCartUrl,
              method: "GET",
              headers: {
                // Add custom headers here if needed
                Authorization: `Bearer ${cookieJwtToken}`,
              },
            });
            console.log(response);
          } catch (error) {
            console.log("error", error);
          }
        } catch (error) {}
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
