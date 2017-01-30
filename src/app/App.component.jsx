import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import Nav from "../ui/Nav.container";
import FlashMessage from "../flash/FlashMessage.container";

export class App extends Component {

  componentDidMount() {
    // sets logout timer each time the app is mounted aka. window is reloaded
    // if the user is actually logged in
    if (this.props.user.email) {
      this.props.setLogoutTimeout();
      this.props.connectToSocket();
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
import { connectToSocket } from "socket/socket.actions";

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
  connectToSocket() {
    dispatch(connectToSocket());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
