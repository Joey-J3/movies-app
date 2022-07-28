const { resolve } = require("path");
const Dotenv = require("dotenv-webpack");

/* TODO: Currently NODE_ENV is undefined, need to fix
   Why: dotenv don't config yet at this point
 */
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
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
        use: {
          loader: "babel-loader",
        },
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
};
