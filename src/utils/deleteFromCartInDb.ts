import { customfetch } from "api";
import { shopItem } from "interfaces";
import { getCookie } from "./cookies";
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

export async function deleteFromCartInDb(item: any) {
  if (item.glassID || item.GlassesId) {
    let Id = item.glassID || item.GlassesId;
    const deleteItemFromCartUrl = `${baseUrl.loaclhost}/cart/deleteItemFromCart/Glasses/${Id}`;
    const cookieJwtToken = getCookie("cookieJwtToken");
    console.log("cookieJwtToken", cookieJwtToken);

    try {
      let response: shopItem[] = await customfetch({
        url: deleteItemFromCartUrl,
        method: "DELETE",
        headers: {
          // Add custom headers here if needed
          Authorization: `Bearer ${cookieJwtToken}`,
        },
      });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
      //setlogedIn(false);
    }
  }

  if (item.thickness || item.Thickness) {
    const addItemToCartUrl = `${baseUrl.loaclhost}/shop/GetLensesByDetails`;
    const cookieJwtToken = getCookie("cookieJwtToken");
    console.log("cookieJwtToken", cookieJwtToken);

    try {
      let response: lensessType = await customfetch({
        url: addItemToCartUrl,
        method: "POST",
        body: {
          Lens_Coating_Name: item.lensCoating || item.LensCoating,
          Thickness_Size: item.thickness || item.Thickness,
          Cylinder_Size: item.cylinder || item.Cylinder,
          Prescription_Strength_Size:
            item.prescriptionStrength || item.PrescriptionStrength,
        },
      });
      console.log(response);
      // setDatacategory(response[0].Category)

      if (response) {
        try {
          console.log("testtest", response.Id);

          const addItemToCartUrl = `${baseUrl.loaclhost}/cart/deleteItemFromCart/Lenses/${response.Id}`;
          const cookieJwtToken = getCookie("cookieJwtToken");
          console.log("cookieJwtToken", cookieJwtToken);

          try {
            let response = await customfetch({
              url: addItemToCartUrl,
              method: "DELETE",
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

  if (
    (item.ExpiryDate && item.cylinder && item.prescriptionStrength) ||
    (item.ExpiryDate && item.Cylinder && item.PrescriptionStrength)
  ) {
    const addItemToCartUrl = `${baseUrl.loaclhost}/shop/GetContactLensesByDetails`;
    const cookieJwtToken = getCookie("cookieJwtToken");
    console.log("cookieJwtToken", cookieJwtToken);

    try {
      let response: contactLensType = await customfetch({
        url: addItemToCartUrl,
        method: "POST",
        body: {
          Expiry_Date_Name: item.ExpiryDate,
          Cylinder_Size: item.cylinder || item.Cylinder,
          Prescription_Strength_Size:
            item.prescriptionStrength || item.PrescriptionStrength,
        },
      });
      console.log(response);
      // setDatacategory(response[0].Category)

      if (response) {
        try {
          const addItemToCartUrl = `${baseUrl.loaclhost}/cart/deleteItemFromCart/Contact_Lenses/${response.Id}`;
          const cookieJwtToken = getCookie("cookieJwtToken");
          console.log("cookieJwtToken", cookieJwtToken);

          try {
            let response = await customfetch({
              url: addItemToCartUrl,
              method: "DELETE",
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
