import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./smart/App.smartcomponent";

import { makeStore } from "./store";
const store = makeStore();

// console.log("index.js store:", store);
// console.log("index.js store.getState():", store.getState());
// console.log("index.js store.getState().get('turha'):", store.getState().get('turha'));
// console.log("index.js store.getState().get('turha').turhastatus:", store.getState().get('turha').turhastatus);
// console.log("index.js store.getState().get('turha').get('turhastatus'):", store.getState().get('turha').get('turhastatus'));
// console.log("index.js store.getState().getIn('turhastatus'):", store.getState().getIn('turhastatus'));
// console.log("index.js store.getState().get('turhastatus'):", store.getState().get('turhastatus'));

const container = document.getElementById("app");
const Root = (
	<Provider store={store}>
	  <App />
	</Provider>
);

ReactDOM.render(Root, container);
