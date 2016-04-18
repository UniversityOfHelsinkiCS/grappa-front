/*
* The react component used to create the Navigation bar.
*/

import React, { Component } from "react";
import { Link } from "react-router";
import { logout } from "../login/login.actions";
export default class Nav extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

/*
* The handler method for handling the actions for when the logout button is clicked.
*/
  handleLogout() {
    logout();
  }

/*
* The render method which states what to render onto the view.
*/
  render() {
    return (
      <div id="nav" className="ui vertical pointing menu">
        <Link className="item" to="/login">Login</Link>
        <a className="item" onClick={ this.handleLogout }>Logout</a>
        <Link className="item" to="/thesis">ThesesList </Link>
        <Link className="item" to="/thesis/new">ThesesCreate </Link>
        <Link className="item" to="/thesis/1">ThesesShow </Link>
        <Link className="item" to="/councilmeeting">Councilmeetings </Link>
        <Link className="item" to="/councilmeeting/new">Add new meetingdate</Link>
      </div>
    );
  }
}
