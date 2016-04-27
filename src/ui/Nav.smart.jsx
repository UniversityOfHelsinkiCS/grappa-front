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
    this.props.logout();
    browserHistory.push("/login");
  }

  renderNonLoggedNav() {
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/login">Login</Link>
      </div>
    );
  }

  renderUserNav() {
    const { user } = this.props;
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/user">{ user.name }</Link>
        <a className="item" onClick={ this.handleLogout }>Logout</a>
        <Link className="item" to="/thesis">Theses</Link>
        <Link className="item" to="/thesis/new">Add new thesis</Link>
        <Link className="item" to="/thesis/1">ThesesShow </Link>
      </div>
    );
  }

  renderAdminNav() {
    const { user } = this.props;
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/user/me">{ user.name }</Link>
        <a className="item" onClick={ this.handleLogout }>Logout</a>
        <Link className="item" to="/thesis">Theses</Link>
        <Link className="item" to="/thesis/new">Add new thesis</Link>
        <Link className="item" to="/thesis/1">ThesesShow </Link>
        <Link className="item" to="/councilmeeting">Council meetings </Link>
        <Link className="item" to="/councilmeeting/new">Add new meeting</Link>
        <Link className="item" to="/user">Accept new users</Link>
      </div>
    );
  }

  renderNav() {
    const isAdmin = this.props.user.role === "admin";
    return (
      <div>
        { isAdmin ? this.renderAdminNav() : this.renderUserNav() }
      </div>
    );
  }
/*
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
