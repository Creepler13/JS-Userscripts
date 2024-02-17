import { getCookie, setCookie } from "./CookieUtils";
import { hash } from "./CryptoUtils";

/*
 * downst work with object use cookieLess but with arrays
 *
 * @param {url} url
 * @param {Function} callback returned value will be returned by the promise and chached
 */
export async function cachedFetch(url, callback, cacheExpire) {
  let cookieData = getCookie(btoa(url));
  if (cookieData) return cookieData;

  let fetchReturn = await fetch(url);
  let text = await fetchReturn.text();
  let data = callback(text);
  setCookie(btoa(url), data, cacheExpire ? cacheExpire : "1200000");
  return data;
}

let fetchCookieLessStore = {};
export async function cachedFetchCookieLess(url, callback) {
  let cookieData = fetchCookieLessStore[btoa(url)];
  if (cookieData) return cookieData;

  let fetchReturn = await fetch(url);
  let text = await fetchReturn.text();
  let data = callback(text);
  fetchCookieLessStore[btoa(url)] = data;
  return data;
}

let functionCookieLessStore = {};
export function cachedFunction(func, ...args) {
  let funcHash = hash(func.toString());
  let argsHash = hash(args.toString());

  if (functionCookieLessStore[funcHash])
    if (functionCookieLessStore[funcHash][argsHash])
      return functionCookieLessStore[funcHash][argsHash];

  let data = func(...args);
  if (!functionCookieLessStore[funcHash])
    functionCookieLessStore[funcHash] = {};
  functionCookieLessStore[funcHash][argsHash] = data;
  return data;
}

export async function cachedFunctionAsync(func, ...args) {
  let funcHash = hash(func.toString());
  let argsHash = hash(args.toString());

  if (functionCookieLessStore[funcHash])
    if (functionCookieLessStore[funcHash][argsHash])
      return functionCookieLessStore[funcHash][argsHash];

  let data = await func(...args);
  if (!functionCookieLessStore[funcHash])
    functionCookieLessStore[funcHash] = {};
  functionCookieLessStore[funcHash][argsHash] = data;
  return data;
}
