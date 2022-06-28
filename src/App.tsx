import React from "react";
import Home from "./pages/home/Home";
import { Provider } from "react-redux";
import "./app.scss";
import { store } from "./store";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
