import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

/*
 * Main component that wraps all other components inside of it
 */
export default class App extends Component {

  render() {
    return (
      <div>
        <h1>Hei olen App komponentti, minun sisälläni on kaikki!</h1>
        <Link to="/login">Login</Link>
        <Link to="/thesis"> | ThesesList </Link>
        <Link to="/thesis/new"> | ThesesCreate </Link>
        <Link to="/thesis/1"> | ThesesShow </Link>
        <Link to="/councilmeeting"> | Councilmeetings </Link>
        <Link to="/councilmeeting/new"> | Add new meetingdate</Link>

        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
