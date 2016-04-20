/*
* The react component used to create the Navigation bar.
*/

import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
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
    const { logout } = this.props;
    logout();
    browserHistory.push("/login");
  }

/*
* The render method which states what to render onto the view.
*/
  render() {
    const { user } = this.props;
    console.log(user);
    const { loggedIn } = this.props;
    return (
      <div id="nav">
        {
          loggedIn ?
            <div className="ui horizontal pointing menu">
              <Link className="item" to="/user">{ user.name }</Link>
              <a className="item" onClick={ this.handleLogout }>Logout</a>
              <Link className="item" to="/thesis">ThesesList </Link>
              <Link className="item" to="/thesis/new">ThesesCreate </Link>
              <Link className="item" to="/thesis/1">ThesesShow </Link>
              <Link className="item" to="/councilmeeting">Councilmeetings </Link>
              <Link className="item" to="/councilmeeting/new">Add new meetingdate</Link>
            </div>
              :
            <div className="ui horizontal pointing menu">
              <Link className="item" to="/login">Login</Link>
            </div>
        }
      </div>
    );
  }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  return {
    user: auth.get("user").toJS(),
    loggedIn: auth.get("loggedIn"),
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout() {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
