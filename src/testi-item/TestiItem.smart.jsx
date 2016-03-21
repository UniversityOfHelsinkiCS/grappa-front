import React, { Component, PropTypes } from "react";

export class TestiItem extends Component {

  constructor() {
    super();
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(event) {
    event.preventDefault();
    const { addTestiItem } = this.props;
    const newItem = {
      id: this.props.id + 1,
      name: this.props.name,
      status: this.props.status,
    };
    addTestiItem(newItem);
  }

  render() {
    const { id, name, status } = this.props;
    return (
      <div>
        <h3>Olen TestiItem id: { id }</h3>
        <p>nimeltä: { name }</p>
        <p>ja statukseni on { status }</p>
        <button onClick={this.saveItem}>addTestiItem</button>
      </div>
    );
  }
}

TestiItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

import { connect } from "react-redux";

import { addTestiItem } from "./TestiItem.actions";

const mapDispatchToProps = (dispatch) => ({
  addTestiItem(newItem) {
    dispatch(addTestiItem(newItem));
  },
});

export default connect(null, mapDispatchToProps)(TestiItem);
