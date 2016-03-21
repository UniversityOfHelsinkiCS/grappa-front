import React, { Component } from "react";

import TestiItemList from "../testi-item-list/TestiItemList.smart";

export class App extends Component {

  render() {
    const { listani } = this.props;
    const lista = listani.toJS();
    return (
      <div>
        <h1>Hei olen App komponentti, minun sisälläni on kaikki!</h1>
        <TestiItemList lista={ lista }/>
      </div>
    );
  }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const turha = state.get("turha");
  const testi = state.get("testi");
  return {
    turhalista: turha.get("turhalista"),
    turhastatus: turha.get("turhastatus"),
    listani: testi.get("listani"),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, null)(App);
