import React, { Component } from "react";

import TestiItemList from "./TestiItemList.smartcomponent";

export class App extends Component {

  componentDidMount() {
    console.log("componentDidMount called in TestiItemList");
    // console.log("testi on ", testi);
  }

  render() {
    console.log("props: ", this.props)
    const { turhalista } = this.props;
    console.log("turhalista: ", turhalista);
    // const state = store.getState();
    // const lista = state.testi.listani;
    const { listani } = this.props;
    const lista = listani.toJS();
    console.log("lista: ", lista);
    // console.log("state:", state)
    return (
      <div>
        <h1>Hei olen App komponentti, minun sisälläni on kaikki!</h1>
        <TestiItemList lista={ lista }/>
      </div>
    )
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
  }
};

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App);
