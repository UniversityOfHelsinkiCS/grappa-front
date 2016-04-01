import React, { Component } from "react";
import ThesisList from "../thesis/ThesisList.smart";
// import AddThesis from "../add-thesis/AddThesis.smart";
export class App extends Component {

  render() {
    return (
      <div>
        <ThesisList />
      </div>
    );
  }
}

import { connect } from "react-redux";

export default connect()(App);