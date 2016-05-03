import React, { Component, PropTypes } from "react";
import Nav from "../ui/Nav.smart";
import FlashMessage from "../flash/FlashMessage.smart";

export default class App extends Component {

  render() {
    return (
      <div>
        <h1>Gradut Pikaisesti Pakettiin</h1>
        <Nav />
        <FlashMessage />
        <main className="main-container">
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
