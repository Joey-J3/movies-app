const { resolve, join } = require("path");
const { merge } = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("./webpack.config.base");

module.exports = merge(config, {
  mode: "production",
  entry: resolve(__dirname, "../src/index.tsx"),
  output: {
    path: join(__dirname, "../public"),
    filename: "index_bundle.js",
    assetModuleFilename: "static/[contenthash][ext][query]",
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../index.html"),
    }),
  ],
});
