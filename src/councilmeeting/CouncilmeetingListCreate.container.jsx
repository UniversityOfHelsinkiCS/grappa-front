import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Link } from "react-router";

export class CouncilmeetingListCreate extends Component {

  constructor() {
    super();
    this.state = {
      newCM: {
        date: moment(),
      },
      editCM: {},
      shownDates: [],
      formattedDates: [],
      filteredDates: [],
    };
  }

  componentWillMount() {
    const formatted = this.formatMeetingsForReactTable(this.props.CouncilMeetings);
    const filtered = this.filterOldDates(this.props.CouncilMeetings);
    const filteredAndFormatted = this.formatMeetingsForReactTable(filtered);
    this.setState({
      shownDates: filteredAndFormatted,
      formattedDates: formatted,
      filteredDates: filteredAndFormatted,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.CouncilMeetings) {
      const formatted = this.formatMeetingsForReactTable(newProps.CouncilMeetings);
      const filtered = this.filterOldDates(newProps.CouncilMeetings);
      const filteredAndFormatted = this.formatMeetingsForReactTable(filtered);
      this.setState({
        shownDates: !this.refs.checkOld.checked ? filteredAndFormatted : formatted,
        formattedDates: formatted,
        filteredDates: filteredAndFormatted,
      });
    }
  }

  formatMeetingsForReactTable(meetings) {
    // return meetings;
    return meetings.map(meeting => {
      meeting.date = moment(new Date(meeting.date));
      return meeting;
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

  handleChange(type, date) {
    if (type === "newCM") {
      this.state.newCM.date = date;
      this.setState({});
    } else if (type === "editCM") {
      this.state.editCM.date = date;
      this.setState({});
    }
  }

  handleClick(type, index, event) {
    event.preventDefault();
    if (type === "save") {
      const newCM = this.state.newCM;
      newCM.date = newCM.date.toDate(),
      this.props.saveCouncilMeeting(newCM);
    } else if (type === "update") {
      const editCM = Object.assign({}, this.state.editCM);
      editCM.date = editCM.date.toDate(),
      this.props.updateCouncilMeeting(editCM);
    } else if (type === "selectCM") {
      this.state.editCM = this.state.shownDates[index];
      this.setState({});
    }
  }

  render() {
    const { shownDates } = this.state;
    return (
      <div className="ui form">
        <div className="ui two fields">
         <div className="field">
            <div className="field">
              <h2 className="ui dividing header">Create a councilmeeting date</h2>
              <p>
                There can be only one meeting per date.
              </p>
              <div className="two fields">
                <div className="field">
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={this.state.newCM.date}
                    onChange={this.handleChange.bind(this, "newCM")}
                  />
                </div>
                <div className="field">
                  <button className="ui primary button" onClick={this.handleClick.bind(this, "save", "")}>Submit</button>
                </div>
              </div>
            </div>
            <div className="field">
              <h2 className="ui dividing header">Change meetings date {this.state.editCM.date ? this.state.editCM.date.format("DD/MM/YYYY") : ""}</h2>
              <div className="two fields">
                <div className="field">
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={this.state.editCM.date}
                    onChange={this.handleChange.bind(this, "editCM")}
                  />
                </div>
                <div className="field">
                  <button className="ui green button" onClick={this.handleClick.bind(this, "update", "")}>Update</button>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <h2 className="ui dividing header">Upcoming councilmeetings</h2>
            <div className="ui checkbox">
              <input ref="checkOld" type="checkbox" onClick={this.handleCheckBoxClick.bind(this)}/>
              <label>Show also past dates</label>
            </div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th onClick={this.handleClick.bind(this, "sort", "status")}>Date</th>
                  <th onClick={this.handleClick.bind(this, "sort", "authorFirstname")}>Theses</th>
                </tr>
              </thead>
              <tbody>
                { shownDates.map((item, index) =>
                  <tr key={index} onClick={this.handleClick.bind(this, "selectCM", index)}>
                    <td>
                      <Link to={`/councilmeeting/${item.id}`}>{item.date.format("DD/MM/YYYY")}</Link>
                    </td>
                    <td>66</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";
import { getCouncilMeetings, saveCouncilMeeting, updateCouncilMeeting } from "./councilmeeting.actions";

const mapStateToProps = (state) => {
  const councilmeeting = state.get("councilmeeting");
  const thesis_r = state.get("thesis");
  return {
    CouncilMeetings: councilmeeting.get("councilmeetings").toJS(),
    Theses: thesis_r.get("theses").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCouncilMeetings() {
    dispatch(getCouncilMeetings());
  },
  saveCouncilMeeting(data) {
    dispatch(saveCouncilMeeting(data));
  },
  updateCouncilMeeting(data) {
    dispatch(updateCouncilMeeting(data))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CouncilmeetingListCreate);
