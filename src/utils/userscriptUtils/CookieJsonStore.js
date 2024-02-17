import { getCookie, removeCookie, setCookie } from "./CookieUtils";

export function loadCookieStore(key) {
  let data = getCookie(key);

  if (data) {
    data = JSON.parse(data);
  }

  let t = {
    data: data ? data : {},
    save: (_) => {
      let data = JSON.stringify(t.data);
      setCookie(key, data);
    },
    remove: (_) => {
      removeCookie(key);
    },
  };

  t.save();
  return t;
}
