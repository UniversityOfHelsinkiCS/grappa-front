import React, { Component } from "react";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { getCouncilmeetings } from "./councilmeeting.actions";

export class CouncilmeetingList extends Component {

  constructor() {
    super();
    this.dateFormatter = this.dateFormatter.bind(this);
  }

  componentDidMount() {
    const { getCouncilmeetings } = this.props;
    getCouncilmeetings();
  }

dateFormatter(cell, row) {
  const origDate = new Date(row.date);
  return `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;
}

  render() {
    const { councilmeetings } = this.props;
    return (
      <div>
        <h2>Councilmeetings</h2>
        <BootstrapTable data={councilmeetings} search bordered={false}>
          <TableHeaderColumn filter= {{ type: "TextFilter" }} dataField="id" isKey hidden>
          Councilmeeting ID</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.dateFormatter} dataSort width="200">Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
        );
  }

}


const mapStateToProps = (state) => {
  const councilmeeting = state.get("councilmeeting");
  return {
    councilmeetings: councilmeeting.get("councilmeetings").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCouncilmeetings() {
    dispatch(getCouncilmeetings());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CouncilmeetingList);
