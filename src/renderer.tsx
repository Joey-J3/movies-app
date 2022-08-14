import path from "path";
import qs from "qs";
import React from "react";
import { Request, Response } from "express";
import { matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import StyleContext from "isomorphic-style-loader/StyleContext";
import createStore, { RootState } from "./store";
import App from "./App";
import { routes } from "./router/config";

function renderHTML(html: string, preloadedState: RootState) {
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
        <div id="app">${html}</div>
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
  return (req: Request, res: Response) => {
    const store = createStore();
    
    const promises = routes.reduce<Promise<any>[]>((acc, route) => {
      if (matchPath(req.url, route.path) && route.component && route.loadData) {
        acc.push(route.loadData(store, req.query));
      }
      return acc;
    }, []);
    Promise.all(promises).then(() => {
      const css = new Set(); // CSS for all rendered React components
      const insertCss = (...styles: Style[]) =>
        styles.forEach((style) => css.add(style._getCss()));
      const renderRoot = () => (
        <StyleContext.Provider value={{ insertCss }}>
          <App location={req.url} store={store} Router={StaticRouter} />
        </StyleContext.Provider>
      );
      const htmlString = renderToString(renderRoot());
      const route = routes.find((route) => matchPath(req.url, route.path));
      if (route && route.redirect) {
        res.writeHead(302, {
          Location: path.join(req.baseUrl, route.redirect),
        });
        res.end();
        return;
      }
      const preloadedState = store.getState();
      const string = renderHTML(htmlString, preloadedState)
      res.send(string);
    });
  };
}
