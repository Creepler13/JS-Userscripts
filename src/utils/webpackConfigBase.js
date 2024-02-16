const { UserscriptPlugin } = require("webpack-userscript");
const fs = require("fs");
module.exports = getWebpackConfig;

function getWebpackConfig(scriptName, private, headers) {
  let folder = (private ? "private" : "public") + "/" + scriptName;
  if (!fs.existsSync("builds/" + folder)) fs.mkdirSync("builds/" + folder);
  if (!fs.existsSync("src/" + folder)) fs.mkdirSync("src/" + folder);

  let dev = process.env.NODE_ENV == "development";

  let userscriptConfig = {
    metajs: false,
    headers: {
      ...headers,
      author: "Creepler13",
      name: scriptName,
    },
  };

  if (dev) {
    userscriptConfig.headers.version =
      userscriptConfig.headers.version + ".[buildNo]";
  }
  let config = {
    optimization: {
      usedExports: true,
      minimize: true,
    },
    output: {
      filename: scriptName + ".user.js",
      path: fs.realpathSync("builds/" + folder),
    },
    module: {
      rules: [],
    },
    entry: fs.realpathSync("src/" + folder + "/index.js"),
    plugins: [new UserscriptPlugin(userscriptConfig)],
  };

  if (dev) {
    config.optimization.minimize = false;
    config.devtool = false;
  }

  return config;
}
