import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { store } from "./store";

// ReactDom.render(<App />, document.getElementById("app"))

const root = createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// if (module.hot) {
//   module.hot.accept("./App", () => {
//     console.log("a module replaced");
//   });
// }
