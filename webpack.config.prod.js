const { merge } = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = require("./webpack.config.base");

module.exports = merge(config, {
  mode: "production",
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});
