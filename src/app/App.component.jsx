import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import Nav from "../ui/Nav.container";
import FlashMessage from "../flash/FlashMessage.container";

export class App extends Component {

  componentDidMount() {
    console.log("app mounted!");
    console.log(this.props.user)
    if (this.props.user.email) {
      this.props.setLogoutTimeout();
    }
  }

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

import { connect } from "react-redux";
import { setLogoutTimeout } from "ping/ping.actions";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  return {
    user: auth.get("user").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  setLogoutTimeout() {
    dispatch(setLogoutTimeout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
