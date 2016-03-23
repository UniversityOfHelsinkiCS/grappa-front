import React, { Component } from "react";
import ThesisList from "../thesis-list/ThesisList.smart";
// import AddThesis from "../add-thesis/AddThesis.smart";
export class App extends Component {

  render() {
    const { theses } = this.props;
    const these = theses.toJS();
    return (
      <div>
        <ThesisList theses={these} />
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

export default connect(mapStateToProps, null)(App);
