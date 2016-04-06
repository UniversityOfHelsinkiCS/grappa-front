import React, { Component } from "react";

export class ThesisShow extends Component {

  constructor() {
    super();
    this.addThesis = this.addThesis.bind(this);
  }

  addThesis() {
    event.preventDefault();
    const { saveThesis } = this.props;
    const newThesis = {
      author: "testi",
      title: "hei",
    };
    saveThesis(newThesis);
  }

  render() {
    return (
      <div>
        <h1>Thesis show!</h1>
        <p>author: testi, title: hei</p>
        <button onClick={this.addThesis}>addThesis</button>
        <header>
          <h1 id="sign">Sign in as USER</h1>
          <div id="nav" className="ui vertical pointing menu">
            <a className="item">Home</a>
            <a className="item active">Add new thesis</a>
            <a className="item">View all theses</a>
          </div>
        </header>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { saveThesis } from "./thesis.actions";

const mapDispatchToProps = (dispatch) => ({
  saveThesis(newThesis) {
    dispatch(saveThesis(newThesis));
  },
});

export default connect(null, mapDispatchToProps)(ThesisShow);
