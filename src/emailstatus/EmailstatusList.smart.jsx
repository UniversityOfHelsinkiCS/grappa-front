import React, { Component } from "react";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { getEmailstatuses } from "./emailstatus.actions";

export class EmailstatusList extends Component {

  constructor() {
    super();
    this.lastSentDateFormatter = this.lastSentDateFormatter.bind(this);
    this.deadlineDateFormatter = this.deadlineDateFormatter.bind(this);
    this.wasErrorDataFormatter = this.wasErrorDataFormatter.bind(this);
  }

  componentDidMount() {
    const { getEmailstatuses } = this.props;
    getEmailstatuses();
  }

  lastSentDateFormatter(cell, row) {
    const origDate = new Date(row.lastSent);
    return `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}
    ${origDate.getHours()}:${origDate.getMinutes()}:${origDate.getSeconds()}`;
  }
  deadlineDateFormatter(cell, row) {
    const origDate = new Date(row.deadline);
    return `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}
    ${origDate.getHours()}:${origDate.getMinutes()}:${origDate.getSeconds()}`;
  }
  wasErrorDataFormatter(cell, row) {
    if (row.wasError) {
      return "No";
    }
    return "Yes";
  }
  render() {
    const { emailstatuses } = this.props;
    return (
      <div>
        <h2 className="ui dividing header">Emailstatuses</h2>
        <BootstrapTable className="ui table" data={emailstatuses} search bordered={false}>
          <TableHeaderColumn filter= {{ type: "TextFilter" }} dataField="id" isKey hidden>
          EmailStatus ID</TableHeaderColumn>
          <TableHeaderColumn dataField="type" dataSort width="200">Type</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.lastSentDateFormatter} dataSort width="200">Last sent</TableHeaderColumn>
          <TableHeaderColumn dataField="to" dataSort width="200">Receiver</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.deadlineDateFormatter} dataSort width="200">Deadline</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.wasErrorDataFormatter} dataSort width="200">Sent successfully</TableHeaderColumn>
        </BootstrapTable>
      </div>
      );
  }

}


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
