import React, { Component } from 'react';

import TestiItemList from "../components/TestiItemList.component"
import * as TestiItemActions from "../actions/TestiItem.actions";

import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
/*
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
*/
 const finalCreateStore = compose(
   devTools(),
   persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
   createStore
 );

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <button onClick={() => doSomething()}>Do stuff!</button>
        <TestiItemList lista={[ { name: "eka" }, { name: "toka" } ]}/>
      </div>
    );
  }
}