import App from "@/App";
import createStore from "@/store";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

function renderHTML(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset=utf-8>
        <title>Movie</title>
        ${
          process.env.NODE_ENV === "development"
            ? ""
            : "<link href='/css/main.css' rel='stylesheet' type='text/css'>"
        }
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(
              preloadedState
            ).replace(/</g, "\\u003c")}
          </script>

      </body>
    </html>
  `;
}

export default function serverRenderer() {
  return (req, res) => {
    const store = createStore();
    const htmlString = renderToString(
      <App location={req.url} store={store} Router={StaticRouter} />
    );
    const preloadedState = store.getState();
    res.send(renderHTML(htmlString, preloadedState));
  };
}
