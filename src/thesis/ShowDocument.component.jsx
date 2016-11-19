import React, { Component } from "react";
import FlashMessage from "flash/FlashMessage.container";

export class ShowDocument extends Component {

  componentWillMount() {
    const { id, type } = this.props.params;
    this.props.getDocument({
      id,
      type,
    });
  }

  render() {
    return (
      <div className="main-container">
        <div className="ui container m-top">
        </div>
        <FlashMessage />
      </div>
    );
  }
}

import { connect } from "react-redux";

import { getDocument } from "thesis/thesis.actions";

const mapDispatchToProps = (dispatch) => ({
  getDocument(data) {
    dispatch(getDocument(data))
  },
})

export default connect(null, mapDispatchToProps)(ShowDocument);
