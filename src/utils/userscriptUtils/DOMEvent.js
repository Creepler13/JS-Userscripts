import * as DOMUtils from "./DOMUtils";

export function OnElementExists(query, callback, interval, objectOverride) {
  let loop = DOMUtils.loop((_) => {
    let e = (objectOverride ? objectOverride : document).querySelector(query);
    if (e) {
      loop.stop();
      callback(e);
    }
  }, interval);
}

