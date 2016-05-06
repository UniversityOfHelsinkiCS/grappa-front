import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { getCouncilmeetings } from "./councilmeeting.actions";
import { addCouncilmeeting } from "./councilmeeting.actions";
const DatePicker = require("react-datepicker");

export class CouncilmeetingList extends Component {

  constructor() {
    super();
    this.state = {
      date: moment(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
  }

  componentDidMount() {
    const { getCouncilmeetings } = this.props;
    getCouncilmeetings();
  }
  dateFormatter(cell, row) {
    return moment(new Date(row.date)).format("DD/MM/YYYY");
    // const origDate = new Date(row.date);
    // return `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;
  }
  /*
  * Handler method to handle what to do when the submit button is clicked.
  * @param event Used to get a hold of what the input of the user was.
  */
  handleSubmit(event) {
    event.preventDefault();
    const { addCouncilmeeting } = this.props;
    const newCouncilmeeting = {
      date: this.state.date.toDate(),
    };
    addCouncilmeeting(newCouncilmeeting);
  }

  /*
  * Handler method to handle changes happening in the date selection field in the render method.
  * @param date Used to get a hold of what the input of the user was.
  */
  handleChange(date) {
    this.setState({
      date,
    });
  }

  render() {
    const { councilmeetings } = this.props;
    return (
      <div>
        <div>
          <h2>Add a new date for a councilmeeting</h2>
          <DatePicker
            dateFormat="DD/MM/YYYY"
            selected={this.state.date}
            onChange={this.handleChange}
          />
          <button className="ui primary button" onClick={this.handleSubmit}>Submit</button>
          <button className="ui primary button" >Cancel</button>
        </div>
        <div>
          <h2>Councilmeetings</h2>
          <BootstrapTable data={councilmeetings} search bordered={false}>
            <TableHeaderColumn filter= {{ type: "TextFilter" }} dataField="id" isKey hidden>
            Councilmeeting ID</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.dateFormatter} dataSort width="200">Date</TableHeaderColumn>
          </BootstrapTable>
        </div>
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
  addCouncilmeeting(newCouncilmeeting) {
    dispatch(addCouncilmeeting(newCouncilmeeting));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CouncilmeetingList);
