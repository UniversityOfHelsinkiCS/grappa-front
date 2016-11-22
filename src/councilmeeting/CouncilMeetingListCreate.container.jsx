import React, { Component } from "react";
import { Link } from "react-router";
import DatePicker from "react-datepicker";
import moment from "moment";
moment.locale("en-gb");
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";

export class CouncilmeetingListCreate extends Component {

  constructor() {
    super();
    this.state = {
      newCouncilMeeting: Validate.createForm("newCouncilMeeting", "councilmeeting"),
      updateCouncilMeeting: Validate.createForm("updateCouncilMeeting", "councilmeetingEdit"),
      shownDates: [],
      formattedDates: [],
      filteredDates: [],
      showOld: false,
    };
  }

  initDates(props) {
    const formatted = this.formatMeetingsForReactTable(props.CouncilMeetings);
    const filtered = this.filterOldDates(props.CouncilMeetings);
    const filteredAndFormatted = this.formatMeetingsForReactTable(filtered);
    this.setState({
      shownDates: this.state.showOld ? formatted : filteredAndFormatted,
      formattedDates: formatted,
      filteredDates: filteredAndFormatted,
    });
  }

  componentWillMount() {
    Validate.subscribeToForm("newCouncilMeeting", "cm", (newCouncilMeeting) =>
      { this.setState({ newCouncilMeeting, }
    );});
    Validate.subscribeToForm("updateCouncilMeeting", "cm", (updateCouncilMeeting) =>
      { this.setState({ updateCouncilMeeting, }
    );});
    this.initDates(this.props);
  }

  componentWillUnmount() {
    Validate.unsubscribe("cm");
  }

  componentWillReceiveProps(newProps) {
    if (this.props.CouncilMeetings !== newProps.CouncilMeetings) {
      this.initDates(newProps);
    }
  }

  formatMeetingsForReactTable(meetings) {
    return meetings.map(meeting => {
      meeting.date = moment(new Date(meeting.date));
      meeting.instructorDeadline = moment(new Date(meeting.instructorDeadline));
      meeting.studentDeadline = moment(new Date(meeting.studentDeadline));
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

  handleDateChange(formname, name, date) {
    Validate.updateForm(formname, name, date);
  }

  handleChange(formname, name, event) {
    event.preventDefault();
    Validate.updateForm(formname, name, event.target.value);
  }

  handleCheckboxChange(event) {
    this.setState({
      shownDates: !this.state.showOld ? this.state.formattedDates : this.state.filteredDates,
      showOld: !this.state.showOld,
    });
  }

  handleClick(type, index, event) {
    event.preventDefault();
    if (type === "save" && Validate.isFormValid("newCouncilMeeting")) {
      const cm = Validate.getForm("newCouncilMeeting").values;
      cm.date = cm.date.toDate();
      this.props.saveCouncilMeeting(cm);
    } else if (type === "update" && this.state.updateCouncilMeeting.values.id
        && Validate.isFormValid("updateCouncilMeeting")) {
      const cm = Validate.getForm("updateCouncilMeeting").values;
      this.props.updateCouncilMeeting(cm);
    } else if (type === "selectCM") {
      Validate.replaceForm("updateCouncilMeeting", this.state.shownDates[index]);
    } else if (type === "delete") {
      this.props.deleteCouncilMeeting(this.state.shownDates[index]);
    }
  }

  render() {
    const { shownDates, newCouncilMeeting, updateCouncilMeeting } = this.state;
    return (
      <div className="ui form">
        <div className="ui two fields">
         <div className="field">
            <div className="field">
              <h2 className="ui dividing header">Create a councilmeeting date</h2>
              <p>
                There can be only one meeting per date. Deadline days is date minus days
                when the deadline is set at 23:59. Eg. if date is 25/11/2016 and instructor
                deadline days is 8 then the deadline is at 23:59 17/11/2016.
              </p>
              <div className="three fields">
                <div className="field">
                  <label>Date</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={newCouncilMeeting.values.date}
                    onChange={this.handleDateChange.bind(this, "newCouncilMeeting", "date")}
                  />
                  <ValidateError errors={newCouncilMeeting.errors} model="newCouncilMeeting" field="date" />
                </div>
                <div className="field">
                  <label>Instructor deadline days</label>
                  <input
                    type="text"
                    value={this.state.newCouncilMeeting.values.instructorDeadlineDays}
                    onChange={this.handleChange.bind(this, "newCouncilMeeting", "instructorDeadlineDays")}
                    placeholder="Days"
                  />
                </div>
                <div className="field">
                  <label>Student deadline days</label>
                  <input
                    type="text"
                    value={this.state.newCouncilMeeting.values.studentDeadlineDays}
                    onChange={this.handleChange.bind(this, "newCouncilMeeting", "studentDeadlineDays")}
                    placeholder="Days"
                  />
                </div>
                <div className="field">
                  <label>&nbsp;</label>
                  <button className="ui primary button" onClick={this.handleClick.bind(this, "save", "")}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="field">
              <h2 className="ui dividing header">
                Change meetings date {updateCouncilMeeting.values.date
                  ? updateCouncilMeeting.values.date.format("DD/MM/YYYY") : ""}
              </h2>
              <p>
                Changing the deadline changes it for every thesis connected to the meeting.
                After deadline has passed no more theses can be added to the meeting.
              </p>
              <div className="three fields">
                <div className="field">
                  <label>Date</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={updateCouncilMeeting.values.date}
                    onChange={this.handleDateChange.bind(this, "updateCouncilMeeting", "date")}
                  />
                  <ValidateError errors={updateCouncilMeeting.errors} model="updateCouncilMeeting" field="date" />
                </div>
                <div className="field">
                  <label>Instructor deadline</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={updateCouncilMeeting.values.instructorDeadline}
                    onChange={this.handleDateChange.bind(this, "updateCouncilMeeting", "instructorDeadline")}
                  />
                  <ValidateError errors={updateCouncilMeeting.errors} model="updateCouncilMeeting" field="instructorDeadline" />
                </div>
                <div className="field">
                  <label>Student deadline</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={updateCouncilMeeting.values.studentDeadline}
                    onChange={this.handleDateChange.bind(this, "updateCouncilMeeting", "studentDeadline")}
                  />
                  <ValidateError errors={updateCouncilMeeting.errors} model="updateCouncilMeeting" field="studentDeadline" />
                </div>
                <div className="field">
                  <label>&nbsp;</label>
                  <button className="ui green button" onClick={this.handleClick.bind(this, "update", "")}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <h2 className="ui dividing header">Upcoming councilmeetings</h2>
            <p>
              You can delete any meeting that has no theses linked to it.
              Otherwise you have to remove/move them before you can delete a meeting.
            </p>
            <div className="ui checkbox">
              <input
                type="checkbox"
                checked={this.state.showOld ? "true" : ""}
                onChange={this.handleCheckboxChange.bind(this, "toggleShowOld")}
              />
              <label>Show also past dates</label>
            </div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th onClick={this.handleClick.bind(this, "sort", "date")}>Date</th>
                  <th onClick={this.handleClick.bind(this, "sort", "instructorDeadline")}>Instructor deadline</th>
                  <th onClick={this.handleClick.bind(this, "sort", "studentDeadline")}>Student deadline</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                { shownDates.map((item, index) =>
                  <tr key={index} onClick={this.handleClick.bind(this, "selectCM", index)}>
                    <td>
                      <Link to={`/councilmeeting/${item.id}`}>{item.date.format("DD/MM/YYYY")}</Link>
                    </td>
                    <td>
                      <Link to={`/councilmeeting/${item.id}`}>{item.instructorDeadline.format("DD/MM/YYYY")}</Link>
                    </td>
                    <td>
                      <Link to={`/councilmeeting/${item.id}`}>{item.studentDeadline.format("DD/MM/YYYY")}</Link>
                    </td>
                    <td>
                      <i className="write icon green grappa-icon"
                        onClick={this.handleClick.bind(this, "selectCM", index)}
                      ></i>
                    </td>
                    <td>
                      <i className="remove icon red grappa-icon"
                        onClick={this.handleClick.bind(this, "delete", index)}
                      ></i>
                    </td>
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
import {
 getCouncilMeetings,
 saveCouncilMeeting,
 updateCouncilMeeting,
 deleteCouncilMeeting
} from "./councilmeeting.actions";

const mapStateToProps = (state) => {
  const cm_r = state.get("councilmeeting");
  const thesis_r = state.get("thesis");
  return {
    CouncilMeetings: cm_r.get("councilmeetings").toJS(),
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
    dispatch(updateCouncilMeeting(data));
  },
  deleteCouncilMeeting(data) {
    dispatch(deleteCouncilMeeting(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CouncilmeetingListCreate);
