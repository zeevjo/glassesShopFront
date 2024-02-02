export function setCookie(name: string, value: string, daysToExpire: number) {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// export function setCookie(name: string, value: string, secondsToExpire: number) {
//   const date = new Date();
//   date.setTime(date.getTime() + secondsToExpire * 1000);
//   const expires = "expires=" + date.toUTCString();
//   document.cookie = name + "=" + value + "; " + expires + "; path=/";
// }
