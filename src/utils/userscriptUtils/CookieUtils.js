export function setCookie(key, value, expires) {
  document.cookie =
    `${key}=${value}; expires=` + expires
      ? expires
      : "Sun, 18 Feb 2080 01:42:22 GMT";
}

export function hasCookie(key) {
  let cookie = document.cookie.match(new RegExp(`${key}=([^;]+)`));
  return cookie != null;
}

export function getCookie(key) {
  let cookie = document.cookie.match(new RegExp(`${key}=([^;]+)`));
  if (cookie) return cookie[1];
  else return false;
}

export function removeCookie(key) {
  document.cookie = key + "=a; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}
