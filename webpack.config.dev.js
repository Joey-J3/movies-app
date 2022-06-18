const { merge } = require("webpack-merge");

const config = require("./webpack.config.base");

module.exports = merge(config, {
  mode: "development",
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    hot: true,
    static: "./dist",
    open: false,
    proxy: {
      "/api": {
        secure: false,
        changeOrigin: true,
        target: "http://localhost:4000/",
        proxyTimeout: 300000,
        timeout: 300000,
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
