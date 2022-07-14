import React from "react";
import "./app.scss";
import Router from "./router/Router";
import { routes } from "./router/config";

function App() {
  return <Router routes={routes} />;
}

export default App;
