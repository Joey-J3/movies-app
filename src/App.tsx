import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { HashRouter } from "react-router-dom";
import "./app.scss";
import Routers from "./router/Router";
import { routes } from "./router/config";
import { Provider } from "react-redux";
import { AppStore } from "./store";

interface IApp {
  Router: typeof HashRouter | typeof StaticRouter;
  location?: string;
  store: AppStore;
}

function App({ Router, location, store }: IApp) {
  return (
    <Provider store={store}>
      <Router location={location}>
        <Routers routes={routes} />
      </Router>
    </Provider>
  );
}

export default App;
