import React, { Component, PropTypes } from "react";

export default class TestiItem extends Component {

  addItem() {
  	console.log("hi from the testilist component!");
  }

  render() {
  	const { name, actions } = this.props;
		return (
			<div>
	      <h3>Olen TestiItem</h3>
        <p>nimeltä: { name }</p>
	      <button onClick={() => actions.TESTIITEM_SAVE_ONE_REQUEST}>Testaa itemin tallennusta!</button>
	    </div>
		);
  }
}
/*
  static propTypes: {
    name: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
  }*/