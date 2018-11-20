import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import Nav from "../ui/Nav";
import FlashMessage from "../flash/FlashMessage";

export class App extends Component {

  componentDidMount() {
    // sets logout timer each time the app is mounted aka. window is reloaded
    // if the user is actually logged in
    if (this.props.user.email) {
      this.props.setLogoutTimeout();
      this.props.connectToSocket();
    }
  }

  redirect = () => {
    location.href = 'https://grappa.cs.helsinki.fi/v2'
  }

  render() {
    return (
      <div>
        <div className="header-box">
          <Link to="/v1/">
            <h1 className="fancy-header">Gradut Pikaisesti Pakettiin</h1>
          </Link>
          <Link className="about-link" to="/v1/about">About</Link>
        </div>
        <Nav />
        <div className="ui center aligned container">

          <div onClick={this.redirect} style={{ borderStyle: 'dashed', borderColor: 'red', borderWidth: "5px" }}>
            <h1 className="ui icon header grappa-header">Grappa is going through changes</h1>
            <h3> If you are looking for the new grappa, <a> click here </a>. </h3>
            <p>
              This site is used by administration in the department of Computer Science until the new version has required features.
        <br />
              New grappa will be found in this address as soon as this is done so feel free to bookmark this page.
        </p>
          </div>
        </div>
        <FlashMessage />
        <main className="main-container m-top">
          {this.props.children}
        </main>
      </div>
    );
  }
}
/* DEPRECATED
App.propTypes = {
  children: PropTypes.node,
};
*/
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
