import { logInStore } from "contexts";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./cart.css";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import {
  addItemToCartInDb,
  addItemToShoppingCartLocalStorage,
  calculateTotalAmount,
  clearShoppingCartLocalStorage,
  deleteFromCartInDb,
  filterAndCountDuplicateCartItems,
  getCookie,
  getShoppingCartLocalStorage,
  removeFromShoppingCartLocalStorage,
  saveToLocalStorage,
} from "utils";
import { CartItemGlasses, CartItemLenses } from "components";
import "./cart.css";
import CartItemContactLenses from "components/CartItemContactLenses";
import { Link } from "react-router-dom";
import { use } from "i18next";
import { customfetch } from "api";
import { jwtDecode } from "jwt-decode";
import { Item, userRoleInterface } from "interfaces";
import { Http2ServerResponse } from "http2";
import { baseUrl } from "../../constants";
import { TIMEOUT } from "dns";

const Cart = () => {
  //clearShoppingCartLocalStorage()
  const {
    displayCart,
    setDispalyCart,
    logedIn,
    setlogedIn,
    cartStorageChange,
    setCartStorageChange,
  } = useContext(logInStore);

  const [addItem, setAddItem] = useState(false);
  const { setTotalOrder } = useContext(logInStore);
  const [t] = useTranslation("global");
  const {
    i18n: { language },
  } = useTranslation();

  interface InventoryProduct {
    InventoryProductId: number;
    ContactLensId?: number;
    GlassesId?: number;
    LensId?: number;

    // Add more fields as needed
  }
  /////////////////////////////////////////////////////////////
  const toggleCart = (closeIconClicked: boolean) => {
    setDispalyCart((prevDisplayCart) => !prevDisplayCart);
  };
  /////////////////////////////////////////////////////////////

  const lastRun = useRef<number>(Date.now());
  let counter = 0;
  useEffect(() => {
    if (logedIn === true) {
      const now = Date.now();

      // Check if last run was less than 1000 milliseconds ago
      //when loging in as a oner our emploeey this componnet 
      //runs two time, so we need to limit it
      if (now - lastRun.current < 1000) {
        console.log("Skipping this run as it's too soon since the last one");
        return;
      }
      counter++;
      console.log("counter", counter);

      /**
       * get cart items from db
       */

      const processCartItems = async () => {
        console.log("herte");
        try {
          /**
           * get all items from cart in DB
           */
          interface InventoryProduct {
            InventoryProductId: number;
            ContactLensId?: number;
            GlassesId?: number;
            LensId?: number;
          }
          let dbCart: InventoryProduct[] = await customfetch({
            url: `${baseUrl.loaclhost}/cart/getAllItemsInCart`,
            method: "GET",
            headers: {
              Authorization: `Bearer ${getCookie("cookieJwtToken")}`,
            },
          });

          // for (const iterator of dbCart) {
          //   addItemToShoppingCartLocalStorage(iterator)
          // }

          /**
           * get cart items from local storage
           */
          const shoppingCartLocalStoage: shoppingCartLocalStoageInterface[] =
            getShoppingCartLocalStorage();
          console.log(
            "shopping cart items DB and local storage::",
            shoppingCartLocalStoage,
            dbCart
          );

          /**
           * get all DB-cart items invntory idws from inventory
           */
          interface itemInvntoryId {
            Id?: number;
          }
          const arrayOfcartItemsIdsFromInventory: itemInvntoryId[] = [];

          if (dbCart.length > 0) {
            for (const item of dbCart) {
              var responseGetProductItemIdFromInventory:
                | itemInvntoryId
                | undefined;
              if (item.ContactLensId) {
                let getProductItemIdFromInventoryUrl = `${baseUrl.loaclhost}/inventory/getProductItemIdFromInventory/Contact_Lenses/${item.ContactLensId}`;
                responseGetProductItemIdFromInventory = await customfetch({
                  url: getProductItemIdFromInventoryUrl,
                  method: "GET",
                });
              }
              if (item.GlassesId) {
                let getProductItemIdFromInventoryUrl = `${baseUrl.loaclhost}/inventory/getProductItemIdFromInventory/Glasses/${item.GlassesId}`;
                responseGetProductItemIdFromInventory = await customfetch({
                  url: getProductItemIdFromInventoryUrl,
                  method: "GET",
                });
              }
              if (item.LensId) {
                let getProductItemIdFromInventoryUrl = `${baseUrl.loaclhost}/inventory/getProductItemIdFromInventory/Lenses/${item.LensId}`;
                responseGetProductItemIdFromInventory = await customfetch({
                  url: getProductItemIdFromInventoryUrl,
                  method: "GET",
                });
              }
              if (responseGetProductItemIdFromInventory !== undefined) {
                // item.InventoryProductId = responseGetProductItemIdFromInventory.Id;

                // arrayOfcartItemsIdsFromInventory.push(
                //   responseGetProductItemIdFromInventory
                // );
                if (responseGetProductItemIdFromInventory !== undefined) {
                  if (responseGetProductItemIdFromInventory.Id) {
                    item.InventoryProductId =
                      responseGetProductItemIdFromInventory.Id;
                  }

                  arrayOfcartItemsIdsFromInventory.push(
                    responseGetProductItemIdFromInventory
                  );
                }
              }
            }
          }

          console.log(
            "Cart Item Id's In Inventory",
            arrayOfcartItemsIdsFromInventory
          );

          /**
           * re-name array cells from {Id:number} to {InventoryProductId:number}
           * for comfort
           */
          const cartItemsIdsFromDb = arrayOfcartItemsIdsFromInventory.map(
            ({ Id, ...rest }) => ({
              InventoryProductId: Id,
              ...rest,
            })
          );

          console.log(
            "re-name Cart Item DB Ids to {InventoryProductId:number}",
            cartItemsIdsFromDb
          );

          interface shoppingCartLocalStoageInterface {
            InventoryProductId: number;
          }

          /**
           * extract the {InventoryProductId:number} fildes from shoppingCartLocalStoage
           */
          const extractInventoryProductIdFiledsFromLocalStorage = (
            inputArray: shoppingCartLocalStoageInterface[]
          ) => {
            const modifiedArray = inputArray.map((item) => {
              return { InventoryProductId: item.InventoryProductId };
            });
            return modifiedArray;
          };

          const inventoryProductIdFiledsFromLocalStorage =
            extractInventoryProductIdFiledsFromLocalStorage(
              shoppingCartLocalStoage
            );
          console.log(
            "inventoryProductIdFiledsFromLocalStorage",
            inventoryProductIdFiledsFromLocalStorage,
            shoppingCartLocalStoage
          );

          /**
           *campare shoppingCartLocalStoage to cart in db and fide items that are missing in cart
           */
          const findMissingItems = (
            localStoreAgeArray: shoppingCartLocalStoageInterface[],
            dbCartArray: any[]
          ) => {
            // Extract InventoryProductId values from each array
            const inventoryProductIdsInArray2 = new Set(
              dbCartArray.map((item) => item.InventoryProductId)
            );

            // Filter items in the first array that do not have a match in the second array
            const missingItems = localStoreAgeArray.filter(
              (item) =>
                !inventoryProductIdsInArray2.has(item.InventoryProductId)
            );

            return missingItems;
          };

          const MissingItemsFromLocalStorageInDb = findMissingItems(
            inventoryProductIdFiledsFromLocalStorage,
            cartItemsIdsFromDb
          );
          console.log(
            "MissingItemsFromLocalStorageInDb",
            MissingItemsFromLocalStorageInDb
          );

          /**
           * get the missing prduct that is missing in DB from LocalStorage
           */
          const getMissingPrductsInDbFromLocalStorage = (
            localStorageCart: shoppingCartLocalStoageInterface[],
            itemIdsFromDb: shoppingCartLocalStoageInterface[]
          ) => {
            return localStorageCart.filter((localStorageItem) => {
              // Check if the InventoryProductId of item1 exists in any item in array2
              return itemIdsFromDb.some(
                (dbCartItem) =>
                  dbCartItem.InventoryProductId ===
                  localStorageItem.InventoryProductId
              );
            });
          };

          let missingPrductsInDbFromLocalStorage =
            getMissingPrductsInDbFromLocalStorage(
              shoppingCartLocalStoage,
              MissingItemsFromLocalStorageInDb
            );

          console.log(
            "missingPrductsInDbFromLocalStorage",
            missingPrductsInDbFromLocalStorage
          );

          /**
           * if there is a missing item in the db add it
           */
          if (missingPrductsInDbFromLocalStorage.length > 0) {
            console.log(
              "missingPrductsInDbFromLocalStorage",
              missingPrductsInDbFromLocalStorage
            );

            for (const item of missingPrductsInDbFromLocalStorage) {
              addItemToCartInDb(item);
            }
          }

          const getItemsNotInLocalStorage = (
            db: any[],
            ls: shoppingCartLocalStoageInterface[]
          ) => {
            // Extract InventoryProductIds from local storage array
            const lsIds = ls.map((item) => item.InventoryProductId);

            // Filter items in the database that are not in local storage
            const itemsNotInLocalStorage = db.filter(
              (item) => !lsIds.includes(item.InventoryProductId)
            );

            return itemsNotInLocalStorage;
          };

          let missingItemsinLocalStorageFromDb = getItemsNotInLocalStorage(
            cartItemsIdsFromDb,
            inventoryProductIdFiledsFromLocalStorage
          );

          console.log(
            "missingItemsinLocalStorageFromDb",
            missingItemsinLocalStorageFromDb
          );

          if (missingItemsinLocalStorageFromDb.length > 0) {
            console.log(
              "shoppingCartLocalStoage.length2",
              shoppingCartLocalStoage.length,
              arrayOfcartItemsIdsFromInventory.length
            );

            for (const item of missingItemsinLocalStorageFromDb) {
              let shouldContinueToNextItem = false;

              for (const iterator of dbCart) {
                if (iterator.InventoryProductId === item.InventoryProductId) {
                  console.log("testffffffffffffffffff");
                  console.log("two", iterator);

                  addItemToShoppingCartLocalStorage(iterator);
                  shouldContinueToNextItem = true;
                  break; // Break out of the inner loop
                }
                // Other code for the inner loop
              }

              if (shouldContinueToNextItem) {
                continue; // Skip to the next iteration of the outer loop
              }

              // Other code for the outer loop
            }
          }

          const shoppingCartLocalStoage1: shoppingCartLocalStoageInterface[] =
            getShoppingCartLocalStorage();

          console.log("shoppingCartLocalStoage1", shoppingCartLocalStoage1);
        } catch (error) {
          const typedError = error as { status?: number; message?: string };

          if (typedError.status) {
            console.log("HTTP status code::", typedError.status);
          } else {
            console.log("Unexpected error format:", typedError.message);
            if (typedError.message) {
              if (
                typedError.message.includes("Request failed with status: 403")
              ) {
                setlogedIn(false);
              }
            }
          }
        }
      };

      processCartItems();
    }
  }, [logedIn]);

  /////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   let reRnderThePage = "";
  // }, [addItem]);

  // useEffect(() => {
  //   if (displayCart === true) {
  //     toggleCart(false);
  //   }
  // }, []);

  const [cartItemComponentsems, setCartItemComponentsems] = useState<
    React.ReactNode[]
  >([]);

  useEffect(() => {
    const shoppingCartLocalStoage = getShoppingCartLocalStorage();

    interface YourObjectType {
      curQuantityInCart: number;
    }

    function removeCurQuantityInCart(
      array: YourObjectType[]
    ): Omit<YourObjectType, "curQuantityInCart">[] {
      return array.map(({ curQuantityInCart, ...rest }) => rest);
    }

    const newArray = removeCurQuantityInCart(shoppingCartLocalStoage);

    let x = filterAndCountDuplicateCartItems(newArray);

    let y = x.map(CartItemComponentsMaping);

    setCartItemComponentsems(y);
  }, [cartStorageChange]);

  // let cartItems;

  const shoppingCartLocalStoage = getShoppingCartLocalStorage();
  // console.log("shoppingCartLocalStoage", shoppingCartLocalStoage);
  type Item = {
    [key: string]: any;
  };

  const handelAddItem = async (item: any) => {
    console.log("itemtest", item);

    /**
     * add to item Local Storage
     */
    let itemCopy = item;
    delete itemCopy.quantityOfItems;

    // console.log("itemCopy", itemCopy);
    addItemToShoppingCartLocalStorage(itemCopy);
    const shoppingCartLocalStoage = getShoppingCartLocalStorage();

    console.log("check1", shoppingCartLocalStoage);

    // let x = filterAndCountDuplicateCartItems(shoppingCartLocalStoage);

    interface YourObjectType {
      curQuantityInCart: number;
    }

    function removeCurQuantityInCart(
      array: YourObjectType[]
    ): Omit<YourObjectType, "curQuantityInCart">[] {
      return array.map(({ curQuantityInCart, ...rest }) => rest);
    }

    const newArray = removeCurQuantityInCart(shoppingCartLocalStoage);

    console.log("t0", newArray);

    let filteredItems = filterAndCountDuplicateCartItems(newArray);
    console.log("t2", filteredItems);
    // setCartItemComponentsems(cartItems.map(CartItemComponentsMaping));

    let cartItemComponents = filteredItems.map(CartItemComponentsMaping);
    console.log("t3", cartItemComponents);

    setCartItemComponentsems(cartItemComponents);
    /**
     * add item to db
     */
    if (logedIn) {
      //add Glasses Item
      if (item.EyeglassImage || item.GalleryImageURL) {
        await addItemToCartInDb(item);
      }
      //add Lensses Item
      if (item.LensCoating) {
        await addItemToCartInDb(item);
      } else if (item.lensCoating) {
        addItemToCartInDb(item);
      }
      //add contactLenses Item
      if (item.ExpiryDate) {
        await addItemToCartInDb(item);
      }
    }
    //setAddItem(!addItem);
  };

  const handelRemoveItem = async (item: any) => {
    console.log("handelRemoveItem", item);

    let itemCopy = item;
    delete itemCopy.quantityOfItems;

    console.log("itemCopy", item);

    removeFromShoppingCartLocalStorage(itemCopy);
    const shoppingCartLocalStoage = getShoppingCartLocalStorage();
    console.log("check2", shoppingCartLocalStoage);

    interface YourObjectType {
      curQuantityInCart: number;
    }

    function removeCurQuantityInCart(
      array: YourObjectType[]
    ): Omit<YourObjectType, "curQuantityInCart">[] {
      return array.map(({ curQuantityInCart, ...rest }) => rest);
    }

    const newArray = removeCurQuantityInCart(shoppingCartLocalStoage);

    let filteredItems = filterAndCountDuplicateCartItems(newArray);
    console.log("t2", filteredItems);
    // setCartItemComponentsems(cartItems.map(CartItemComponentsMaping));
    let cartItemComponents = filteredItems.map(CartItemComponentsMaping);
    console.log("t3", cartItemComponents);

    setCartItemComponentsems(cartItemComponents);
    //setCartAction((prevState) => prevState + 1)
    /**
     * delete item from db
     */
    if (logedIn) {
      //delete Glasses Item
      if (item.glassID || item.GlassesId) {
        console.log("in delete Glsses Item from db");

        await deleteFromCartInDb(item);
      }
      //delete Lensses Item
      if (item.LensCoating || item.lensCoating) {
        console.log("in delete Lensses Item from db");
        await deleteFromCartInDb(item);
      }
      //delete contactLenses Item
      if (item.ExpiryDate) {
        console.log("in delete ContactLensses Item from db");
        await deleteFromCartInDb(item);
      }
    }

    // if (item) {
    //   setCartStorageChange(!cartStorageChange)
    //   const shoppingCartLocalStoage = getShoppingCartLocalStorage();

    //   console.log("hghg", shoppingCartLocalStoage);

    // }

    //setAddItem(!addItem);
    // setCartStorageChange(!cartStorageChange);
    setCartStorageChange(!cartStorageChange);
  };
  /////////////////////////////////////////////////////////////

  const CartItemComponentsMaping = (item: any, index: React.Key) => {
    console.log("jhfejkhrtgfu", item);
    if ("ExpiryDate" in item) {
      return (
        <CartItemContactLenses
          key={index}
          item={item}
          handelAddItem={handelAddItem}
          handelRemoveItem={handelRemoveItem}
        />
      );
    } else if ("LensCoating" in item) {
      return (
        <CartItemLenses
          key={index}
          item={item}
          handelAddItem={handelAddItem}
          handelRemoveItem={handelRemoveItem}
        />
      );
    } else if ("lensCoating" in item) {
      return (
        <CartItemLenses
          key={index}
          item={item}
          handelAddItem={handelAddItem}
          handelRemoveItem={handelRemoveItem}
        />
      );
    } else {
      return (
        <CartItemGlasses
          key={index}
          item={item}
          handelAddItem={handelAddItem}
          handelRemoveItem={handelRemoveItem}
        />
      );
    }
  };

  // const [thereAreItemsInCart, setThereAreItemsInCart] = useState(false);
  // useEffect(() => {
  //   if (CartItemComponentsMaping.length > 0) {
  //     setThereAreItemsInCart(true);
  //   }
  // }, [CartItemComponentsMaping]);

  //setCartItemComponentsems(cartItems.map(CartItemComponentsMaping));

  // useEffect(() => {
  //   setCartItemComponentsems(cartItems.map(CartItemComponentsMaping));
  // }, [CartItemComponentsMaping])
  /**
   * cart items tsx
   */
  // const CartItemComponents = cartItems.map(CartItemComponentsMaping);

  /**
   * total amount for payment
   */

  let total = calculateTotalAmount(shoppingCartLocalStoage);

  return (
    <div
      id="cart-test"
      className={`cart-container-${language}    ${
        displayCart ? ` active-${language}` : ""
      }`}
    >
      <div id="cart-colse-container">
        <MdClose onClick={() => toggleCart(true)} />
        <div id="cart-title-container">{t("cart.title")}</div>
      </div>

      <div>{cartItemComponentsems}</div>

      <div id="total-container">
        <div id="total-title">{t(`cart.total-title`)}</div>
        <div id="total">${total}</div>
        {logedIn && shoppingCartLocalStoage.length > 0 && (
          <Link
            to={"/order"}
            onClick={() => {
              setTotalOrder(total);
              toggleCart(true);
            }}
          >
            <button id="order-btn">{t(`cart.order-btn`)}</button>
          </Link>
        )}
        {!logedIn && (
          <Link
            to={"/account"}
            onClick={() => {
              toggleCart(false);
            }}
          >
            <button id="order-btn">{t(`cart.order-btn-not-logedin`)}</button>
            {/* <button
              id="order-btn"
              onClick={() => {
                clearShoppingCartLocalStorage();
              }}
            >
              clear ls
            </button> */}
            {/* <button
              id="order-btn"
              onClick={() => {
                console.log("LS::", getShoppingCartLocalStorage());
              }}
            >
              give ls
            </button> */}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
