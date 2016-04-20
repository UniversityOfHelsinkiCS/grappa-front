import React, { Component, PropTypes } from "react";
import Nav from "../ui/Nav.smart";
export default class App extends Component {

  render() {
    return (
      <div>
        <h1>Gradut Pikaisesti Pakettiin</h1>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
