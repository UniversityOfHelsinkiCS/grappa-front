import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./app/App.smart";

import { makeStore } from "./store";
const store = makeStore;

const container = document.getElementById("app");
const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Root, container);
