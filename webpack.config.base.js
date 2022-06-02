const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
// const root = path.resolve(__dirname, '..')

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js",
    assetModuleFilename: "static/[contenthash][ext][query]",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "scss"],
    alias: {
      "@": path.resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          // 在开发过程中回退到 style-loader
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.png$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 与 webpackOptions.output 中的选项相似
      // 所有的选项都是可选的
      filename: isDevelopment ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[contenthash].js",
    }),
    new HTMLWebpackPlugin({
      template: "./index.html",
    }),
    new Dotenv({
      path: "./env/base.env",
    }),
  ],
};
