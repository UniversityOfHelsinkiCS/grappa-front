import React, { Component, PropTypes } from "react";

export default class TestiItem extends Component {

  saveItem(event) {
    event.preventDefault();

  	const { addTestiItem } = this.props;
    const newItem = {
      name: this.props.name,
      status: this.props.status,
    }

    addTestiItem(newItem);
  }

  render() {
  	const { name, status, actions } = this.props;
		return (
			<div>
	      <h3>Olen TestiItem</h3>
        <p>nimeltä: { name }</p>
        <p>ja statukseni on { status }</p>
	      <button onClick={(event) => this.saveItem(event) }>Testaa itemin tallennusta!</button>
	    </div>
		);
  }
}
/*
  static propTypes: {
    name: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
  }*/
