import React, { Component } from "react";

import TestiItemList from "../containers/TestiItemList.container";

export default class App extends Component {

  render() {
    const { store } = this.props;
    const state = store.getState();
    console.log("", state)
    return (
      <div>
        <h1>Hei olen App komponentti, minun sisälläni on kaikki!</h1>
        <TestiItemList lista={ state.default.listani }/>
      </div>
    )
  }
}

{/*<TestiItemList lista={[ { id: 1, name: "eka", status: "unsaved" }, { id: 2, name: "toka", status: "unsaved" } ]}/>*/}
