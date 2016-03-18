import React from "react";
import ReactDOM from 'react-dom';

import TestiItemList from "./components/TestiItemList.component";

import makeStore from "./store";

import { doActionSomething } from "./actions/testi.actions";

const store = makeStore();

const doSomething = function() {
	console.log("did stuff!");
	//debugger;
	store.dispatch(doActionSomething());
	console.log(store.getState())
}

const MyComponent = React.createClass({
  render: function(){
		return (
			<div>
	      <h1>Hello, {this.props.name}!</h1>
	      <button onClick={() => doSomething()}>Do stuff!</button>
	      <TestiItemList lista={[ { name: "eka" }, { name: "toka" } ]}/>
	    </div>
		);
  }
});

const root = document.getElementById('app');

ReactDOM.render(<MyComponent name="Handsome" />, root);
//ReactDOM.render(<TestiList listani={[1, 2, 3]} />, root);