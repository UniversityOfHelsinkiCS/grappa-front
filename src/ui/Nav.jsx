/*
* The react component used to create the Navigation bar.
*/

import React, { Component } from "react";
import { browserHistory, Link } from "react-router";

import NotificationIconBox from "notification/NotificationIconBox";
import { logout } from "../auth/auth.actions";

export class Nav extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

/*
* The handler method for handling the actions for when the logout button is clicked.
*/
  handleLogout() {
    this.props.logout();
  }

  renderNonLoggedNav() {
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/v1/login">Login</Link>
        <Link className="item" to="/v1/registration">Register</Link>
        <Link className="item" to="/v1/statistics">Statistics</Link>
      </div>
    );
  }

  renderLink = (route, display) => {
    return <Link className="item" to={route}>{display}</Link>
  };

  renderNav() {
    const isAdmin = this.props.user.role === "admin";
    const isPrintPerson = this.props.user.role === "print-person";
    return (
      <div className="ui horizontal pointing menu">
        { this.renderLink("/v1/user/me", `${this.props.user.firstname} ${this.props.user.lastname}`) }
        { isAdmin ? this.renderLink("/v1/notification", <NotificationIconBox />) : ''}
        { !isPrintPerson ? this.renderLink("/v1/thesis", "Theses") : ''}
        { !isPrintPerson ? this.renderLink("/v1/thesis/new", "Add new thesis") : ''}
        { isAdmin || isPrintPerson ? this.renderLink("/v1/councilmeeting/next", "Next meeting") : ''}
        { isAdmin || isPrintPerson ? this.renderLink("/v1/councilmeeting", "Future councilmeetings") : ''}
        { isAdmin ? this.renderLink("/v1/user/inactive", "Accept new users") : ''}
        { isAdmin ? this.renderLink("/v1/user", "Users") : ''}
        { isAdmin ? this.renderLink("/v1/studyfield", "Studyfields") : ''}
        { isAdmin ? this.renderLink("/v1/emaildraft", "Email drafts") : ''}
        <a className="item" onClick={ this.handleLogout }>Logout</a>
      </div>
    );
  }
  /**
   * The render method which states what to render onto the view.
   */
  render() {
    const loggedIn = this.props.user.role !== undefined;
    return (
      <div id="nav">
        { loggedIn ? this.renderNav() : this.renderNonLoggedNav() }
      </div>
    );
  }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  return {
    user: auth.get("user").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout() {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
