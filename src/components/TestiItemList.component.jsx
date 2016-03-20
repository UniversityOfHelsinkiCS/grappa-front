import React, { Component, PropTypes } from "react";

// import TestiItem from "../containers/TestiItem.container";
import TestiItem from "./TestiItem.smartcomponent";

export default class TestiList extends Component {

  render() {
  	const { lista, actions } = this.props;
		return (
			<div>
	      <h2>Tämä on TestiItemList komponentti</h2>
	      <ul>
	        { lista.map( itemi =>
	        	<li>
		        	<TestiItem
                id = { itemi.id }
		        	  name = { itemi.name }
                status = { itemi.status }
		        	  actions = { actions }
              />
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
