import React, { Component, PropTypes } from "react";

import TestiItem from "./TestiItem.component";

export default class TestiList extends Component {

  render() {
  	const { lista, actions } = this.props;
		return (
			<div>
	      <h1>Tämä on TestiItemList komponentti</h1>
	      <ul>
	        { lista.map( itemi => 
	        	<li>
		        	<TestiItem
		        	  name = { itemi.name }
		        	  actions = { actions } />
	        	</li>
	        )}
	      </ul>
	    </div>
		);
  }
}
/*
TestiList.propTypes = {
	lista: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
} */