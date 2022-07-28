import React from "react";
import StyleContext from "isomorphic-style-loader/StyleContext";
import { hydrateRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import createStore from "./store";

// ReactDom.render(<App />, document.getElementById("app"))
const store = createStore(window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;

const insertCss = (...styles: Style[]) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

hydrateRoot(
  document.getElementById("app"),
  <React.StrictMode>
    <StyleContext.Provider value={{ insertCss }}>
      <App store={store} Router={Router} />
    </StyleContext.Provider>
  </React.StrictMode>
);

// if (module.hot) {
//   module.hot.accept("./App", () => {
//     console.log("a module replaced");
//   });
// }
