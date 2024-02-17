import { getCookie, removeCookie, setCookie } from "./CookieUtils";

export function loadCookieStore(key) {
  let data = getCookie(key);

  if (data) {
    data = atob(data).split(";")[0];
    data = JSON.parse(data);
  }

  let t = {
    data: data ? data : {},
    save: (_) => {
      let data = btoa(JSON.stringify(t.data));
      setCookie(key, data + "; path=/;");
    },
    remove: (_) => {
      removeCookie(key);
    },
  };

  t.save();
  return t;
}
