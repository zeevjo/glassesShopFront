export function getShoppingCartCookie() {
  const cartKey = "Cart";

  // Retrieve existing cart from the cookie or return an empty array
  const existingCartCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cartKey}=`));

  const existingCartJSON = existingCartCookie
    ? decodeURIComponent(existingCartCookie.split("=")[1])
    : "[]";

  return JSON.parse(existingCartJSON);
}
