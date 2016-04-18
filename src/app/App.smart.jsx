import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { logout } from "../login/login.actions";
export default class App extends Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    logout();
  }

  render() {
    return (
      <div>
        <h1>Hei olen App komponentti, minun sisälläni on kaikki!</h1>
        <div id="nav" className="ui vertical pointing menu">
          <Link className="item" to="/login">Login</Link>
          <a className="item" onClick={ this.handleLogout }>Logout</a>
          <Link className="item" to="/thesis">ThesesList </Link>
          <Link className="item" to="/thesis/new">ThesesCreate </Link>
          <Link className="item" to="/thesis/1">ThesesShow </Link>
          <Link className="item" to="/councilmeeting">Councilmeetings </Link>
          <Link className="item" to="/councilmeeting/new">Add new meetingdate</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
