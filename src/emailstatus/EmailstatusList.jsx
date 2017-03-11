import React, { Component } from "react";
import { getEmailstatuses } from "./emailstatus.actions";

export class EmailstatusList extends Component {

  render() {
    const { emailstatuses } = this.props;
    return (
      <div>
        <h2 className="ui dividing header">Emailstatuses</h2>
      </div>
    );
  }
}

import { connect } from "react-redux";


const mapStateToProps = (state) => {
  const emailstatus = state.get("emailstatus");
  return {
    emailstatuses: emailstatus.get("emailstatuses").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getEmailstatuses() {
    dispatch(getEmailstatuses());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailstatusList);
