import React, { Component } from "react";

export class Thesis extends Component {

  constructor() {
    super();
    this.saveThesis = this.saveThesis.bind(this);
  }

  saveThesis(event) {
    event.preventDefault();
    const { addThesis } = this.props;
    const newItem = {
      id: this.props.id + 1,
      author: this.props.author,
      email: this.props.email,
      title: this.props.title,
      instructor: this.props.instructor,
      urkund: this.props.urkund,
      ethesis: this.props.ethesis,
      abstract: this.props.abstract,
      field: this.field.field,
      grade: this.props.grade,
      deadline: this.props.deadline,
    };
    addThesis(newItem);
  }

  render() {
    const { id, author, email, title, urkund, ethesis, abstract, grade } = this.props;
    return (
      <div>
        <h3>Olen Thesis id: { id }</h3>
        <p>author: { author }</p>
        <p>email: { email }</p>
        <p>title: { title }</p>
        <p>urkund: { urkund }</p>
        <p>ethesis: { ethesis }</p>
        <p>abstract: { abstract }</p>
        <p>grade: { grade }</p>
        <button onClick={this.saveThesis}>addThesis</button>
      </div>
    );
  }
}
/*
Thesis.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
*/
import { connect } from "react-redux";

import { addThesis } from "./Thesis.actions";

const mapDispatchToProps = (dispatch) => ({
  addThesis(newItem) {
    dispatch(addThesis(newItem));
  },
});

export default connect(null, mapDispatchToProps)(Thesis);
