import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import Nav from "../ui/Nav.container";
import FlashMessage from "../flash/FlashMessage.container";

export default class App extends Component {

  render() {
    return (
      <div>
        <div className="header-box">
          <h1 className="fancy-header">Gradut Pikaisesti Pakettiin</h1>
          <Link className="about-link" to="/about">About</Link>
        </div>
        <Nav />
        <FlashMessage />
        <main className="main-container m-top">
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
