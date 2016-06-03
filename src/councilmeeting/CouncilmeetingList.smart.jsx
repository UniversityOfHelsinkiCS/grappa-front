import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Table, Thead, Th, unsafe } from "reactable";
import moment from "moment";

export class CouncilmeetingList extends Component {

  constructor() {
    super();
    this.state = {
      date: moment(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getCouncilmeetings();
  }

  filterDates() {
    const condition = this.refs.checkOld.checked;

  }
  /**
   * Handler method to handle what to do when the submit button is clicked.
   * @param event Used to get a hold of what the input of the user was.
   */
  handleSubmit(event) {
    event.preventDefault();
    const newCouncilmeeting = {
      date: this.state.date.toDate(),
    };
    this.props.addCouncilmeeting(newCouncilmeeting);
  }

  /**
  * Handler method to handle changes happening in the date selection field in the render method.
  * @param date Used to get a hold of what the input of the user was.
  */
  handleChange(date) {
    this.setState({
      date,
    });
  }

  handleCheckBoxClick(event) {

  }

  render() {
    const formattedDates = this.props.councilmeetings.map(meeting => {
      return {
        date: moment(new Date(meeting.date)).format("DD/MM/YYYY"),
      };
    });
    const columns = [
      "date",
    ];
    return (
      <div className="ui form">
        <div className="ui two fields">
          <div className="field">
            <h2 className="ui dividing header">Create a councilmeeting date</h2>
            <div className="two fields">
              <div className="field">
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  selected={this.state.date}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <button className="ui primary button" onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
          <div className="field">
            <h2 className="ui dividing header">Upcoming councilmeetings</h2>
            <div className="ui checkbox">
              <input ref="checkOld"
                type="checkbox" onClick={this.handleCheckBoxClick.bind(this)}
              />
              <label>Show also past dates</label>
            </div>
            <Table
              className="ui table"
              noDataText="No theses found"
              ref="table"
              sortable columns={columns}
              data={formattedDates}
              filterable={columns}
            >
              <Thead>
                <Th column="date">Date</Th>
              </Thead>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";
import { getCouncilmeetings } from "./councilmeeting.actions";
import { addCouncilmeeting } from "./councilmeeting.actions";

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
