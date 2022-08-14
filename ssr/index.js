const express = require("express");

const app = express();

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
  const webpackConfig = require("../webpack");

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
    })
  );
  app.use(
    webpackHotMiddleware(
      compiler.compilers.find((c) => c.name === "client")
      // {
      //   log: console.log,
      //   path: "/__webpack_hmr",
      //   heartbeat: 10 * 1000,
      // }
    )
  );
  app.use(webpackHotServerMiddleware(compiler));
} else {
  const serverRenderer = require("../build/serverRenderer").default;

  app.use(express.static("build"));
  app.use(serverRenderer());
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.info(`Express listening on port ${port}`); // eslint-disable-line
});
