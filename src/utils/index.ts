export { getNavItemByTranslationKey } from "./getNavItemByTranslationKey";
export { deleteFromCartInDb } from "./deleteFromCartInDb";
export { calculateTotalAmount } from "./calculateTotalAmount";
export { modelBuilder } from "./shop";
export { areAllFieldsTrue } from "./areAllFieldsTrue";
export { filterAndCountDuplicateCartItems } from "./filterAndCountDuplicateCartItems";
export { addItemToCartInDb } from "./addItemToCartInDb";
export { filterColorsByItems } from "./filterColorsByItems";
export { addToCart } from "./addToCart";
export {
  getCookie,
  deleteCookie,
  setCookie,
  addItemToShoppingCartCookie,
  getShoppingCartCookie,
} from "./cookies";
export {
  hasSpaces,
  hasNoNumbers,
  isAtLeast8Characters,
  isAtLeast4Characters,
  containsUppercaseLetter,
  containsLowercaseLetter,
  containsDigit,
  containsSpecialCharacter,
  hasLetters,
  glassesSizeNumber,
  isFieldValid,
  cylinderSize,
  isValidCreditCardDate,
} from "./validations";
export {
  getShoppingCartLocalStorage,
  addItemToShoppingCartLocalStorage,
  clearShoppingCartLocalStorage,
  removeFromShoppingCartLocalStorage,
  saveToLocalStorage,
} from "./localStorage";
export { matchCartWithStore } from "./matchCartWithStore";
