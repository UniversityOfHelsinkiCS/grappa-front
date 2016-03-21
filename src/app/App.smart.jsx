import React, { Component } from "react";

import ThesisList from "../thesis-list/ThesisList.smart";

export class App extends Component {

  render() {
    const { theses } = this.props;
    const these = theses.toJS();
    return (
      <div>
        <h1>Hei olen App komponentti, minun sisälläni on kaikki!</h1>
        <ThesisList theses={ these }/>
      </div>
    );
  }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const theses = state.get("theses");
  return {
    theses: theses.get("theseslist"),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, null)(App);
