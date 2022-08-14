import React from "react";
import { hydrateRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import createStore from "./store";

// ReactDom.render(<App />, document.getElementById("app"))
const store = createStore(window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;

hydrateRoot(
  document.getElementById("app"),
  <React.StrictMode>
    <App store={store} Router={Router} />
  </React.StrictMode>
);

// if (module.hot) {
//   module.hot.accept("./App", () => {
//     console.log("a module replaced");
//   });
// }
