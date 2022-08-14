// const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { resolve } = require("path");
// const nodeExternals = require("webpack-node-externals");
const isDevelopment = process.env.NODE_ENV === "development";

const entry = resolve(__dirname, "../src/renderer.tsx");

module.exports = {
  name: "server",
  mode: process.env.NODE_ENV,
  target: "node",
  resolve: {
    extensions: [".tsx", ".ts", ".js", "scss"],
    alias: {
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options: {
        //   presets: ["@babel/preset-react", "@babel/preset-env"],
        //   plugins: [
        //     [
        //       "@babel/plugin-transform-runtime",
        //       {
        //         absoluteRuntime: false,
        //         corejs: false,
        //         helpers: true,
        //         regenerator: true,
        //         version: "7.0.0-beta.0",
        //       },
        //     ],
        //   ],
        // },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          "isomorphic-style-loader",
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
          "isomorphic-style-loader",
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
    new Dotenv({
      path: resolve(__dirname, "../env/base.env"),
    }),
  ],
  entry,
  output: {
    filename: "serverRenderer.js",
    path: resolve(__dirname, "../build"),
    libraryTarget: "commonjs2",
  },
};
