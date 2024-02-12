let headers = {
  version: "1.5",
  match: [
    "https://web.archive.org/web/*/https://www.deviantart.com/*/art/*",
    "https://web.archive.org/web/*/https://www.deviantart.com/*",
  ],
  description:
    "Removes the blur on mature DeviantArt posts,previews and literature saved in the WaybackMachine.",
  icon: "https://www.google.com/s2/favicons?sz=64&domain=archive.org",
};

let config = require("../../utils/webpackConfigBase")(
  "WaybackMachine DeviantArt remove mature blur (kind of)",
  false,
  headers
);
module.exports = config;
