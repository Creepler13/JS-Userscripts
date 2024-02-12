let headers = {
  version: "1.1",
  match: ["https://web.archive.org/web/*/https://*.blogspot.com/*"],
  description:
    "Removes the Sensitve Content Warning from Blogspot pages that are saved in the WaybackMachine",
  icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Blogger_icon.svg/800px-Blogger_icon.svg.png",
};

let config = require("../../utils/webpackConfigBase")(
  "WaybackMachine BlogSpot remove Sensitve Content Warning",
  false,
  headers
);
module.exports = config;
