import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Table, Thead, Th, unsafe } from "reactable";
import moment from "moment";

export class CouncilmeetingListCreate extends Component {

  constructor() {
    super();
    this.state = {
      date: moment(),
      shownDates: [],
      formattedDates: [],
      filteredDates: [],
    };
  }

  componentDidMount() {
    this.props.getCouncilMeetings();
  }

  componentWillReceiveProps(newProps) {
    const formatted = this.formatMeetingsForReactTable(newProps.councilmeetings);
    const filtered = this.filterOldDates(newProps.councilmeetings);
    const filteredAndFormatted = this.formatMeetingsForReactTable(filtered);
    this.setState({
      shownDates: !this.refs.checkOld.checked ? filteredAndFormatted : formatted,
      formattedDates: formatted,
      filteredDates: filteredAndFormatted,
    });
  }

  formatMeetingsForReactTable(meetings) {
    return meetings.map(meeting => {
      return {
        date: moment(new Date(meeting.date)).format("DD/MM/YYYY"),
      };
    });
  }

  filterOldDates(meetings) {
    const today = new Date();
    return meetings.filter(meeting => {
      const mdate = new Date(meeting.date);
      if (mdate >= today || mdate.toDateString() === today.toDateString()) {
        return meeting;
      }
    });
  }

  handleCheckBoxClick(event) {
    if (!this.refs.checkOld.checked) {
      this.setState({
        shownDates: this.state.filteredDates,
      });
    } else {
      this.setState({
        shownDates: this.state.formattedDates,
      });
    }
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
    this.props.saveCouncilMeeting(newCouncilmeeting);
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

  render() {
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
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="field">
                <button className="ui primary button" onClick={this.handleSubmit.bind(this)}>Submit</button>
              </div>
            </div>
          </div>
          <div className="field">
            <h2 className="ui dividing header">Upcoming councilmeetings</h2>
            <div className="ui checkbox">
              <input ref="checkOld" type="checkbox" onClick={this.handleCheckBoxClick.bind(this)}/>
              <label>Show also past dates</label>
            </div>
            <Table
              className="ui table"
              noDataText="No meetings found"
              ref="table"
              sortable columns={columns}
              data={this.state.shownDates}
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
import { getCouncilMeetings, saveCouncilMeeting } from "./councilmeeting.actions";

const mapStateToProps = (state) => {
  const councilmeeting = state.get("councilmeeting");
  return {
    councilmeetings: councilmeeting.get("councilmeetings").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCouncilMeetings() {
    dispatch(getCouncilMeetings());
  },
  saveCouncilMeeting(data) {
    dispatch(saveCouncilMeeting(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CouncilmeetingListCreate);
