import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./app/App.smart";

import store from "./store";

const container = document.getElementById("app");
const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Root, container);
