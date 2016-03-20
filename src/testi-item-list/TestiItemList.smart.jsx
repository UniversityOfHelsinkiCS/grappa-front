import React, { Component, PropTypes } from "react";

import TestiItem from "../testi-item/TestiItem.smart";

export class TestiItemList extends Component {

  getItems(event) {
    event.preventDefault();
    const { getTestiItems } = this.props;
    getTestiItems();
  }

  render() {
    const { lista } = this.props;
    return (
      <div>
        <h2>Tämä on TestiItemList komponentti</h2>
        <button onClick={this.getItems()}>getTestiItems</button>
        <ul>
          { lista.map(itemi =>
            <li>
              <TestiItem
                id = { itemi.id }
                name = { itemi.name }
                status = { itemi.status }
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
};

import { connect } from "react-redux";

import { getTestiItems } from "../testi-item/TestiItem.actions";

const mapDispatchToProps = (dispatch) => ({
  getTestiItems() {
    dispatch(getTestiItems());
  },
});

export default connect(null, mapDispatchToProps)(TestiItemList);
