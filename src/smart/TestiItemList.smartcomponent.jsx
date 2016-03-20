import React, { Component, PropTypes } from "react";

// import TestiItem from "../containers/TestiItem.container";
import TestiItem from "./TestiItem.smartcomponent";

export class TestiItemList extends Component {

  getItems(event) {
    event.preventDefault();
    const { getTestiItems } = this.props;
    getTestiItems();
  }

  render() {
  	const { lista, actions } = this.props;
		return (
			<div>
	      <h2>Tämä on TestiItemList komponentti</h2>
        <button onClick={(event) => this.getItems(event) }>getTestiItems</button>
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


TestiItemList.propTypes = {
	lista: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
}

import { connect } from "react-redux";

import { getTestiItems } from "../actions/TestiItem.actions";

const mapDispatchToProps = (dispatch) => ({
  getTestiItems() {
    dispatch(getTestiItems())
  },
});

export default connect(null, mapDispatchToProps)(TestiItemList);
