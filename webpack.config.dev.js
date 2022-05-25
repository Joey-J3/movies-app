const { merge } = require("webpack-merge");

const config = require("./webpack.config.base");

module.exports = merge(config, {
  mode: "development",
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    hot: false,
    open: false,
  },
});
