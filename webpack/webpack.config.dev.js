const { HotModuleReplacementPlugin } = require("webpack");
const { resolve } = require("path");
const { merge } = require("webpack-merge");

const config = require("./webpack.config.base");

module.exports = merge(config, {
  name: "client",
  mode: "development",
  devtool: "source-map",
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr",
    resolve(__dirname, "../src/index.tsx"),
  ].filter(Boolean),
  output: {
    path: resolve(__dirname, "../public"),
    filename: "index.js",
    assetModuleFilename: "static/[contenthash][ext][query]",
  },
  devServer: {
    host: "0.0.0.0",
    port: 8000,
    hot: true,
    static: resolve(__dirname, "../dist"),
    open: false,
    proxy: {
      "/api": {
        secure: false,
        changeOrigin: true,
        target: "http://localhost:4000",
        proxyTimeout: 300000,
        timeout: 300000,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  plugins: [new HotModuleReplacementPlugin()],
});
