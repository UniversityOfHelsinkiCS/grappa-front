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

// const mapDispatchToProps = (dispatch) => ({
//   saveThesis(newItem) {
//     dispatch(saveThesis(newItem));
//   },
// });
//
// export default connect(mapDispatchToProps)(ThesisShow);
