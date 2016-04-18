import React, { Component, PropTypes } from "react";
import Navi from "../ui/Navi.component";
export default class App extends Component {

  constructor(){
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    logout();
    console.log("logout called");
  }

  render() {
    return (
      <div>
        <h1>Hei olen App komponentti, minun sisälläni on kaikki!</h1>
        <Navi />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
