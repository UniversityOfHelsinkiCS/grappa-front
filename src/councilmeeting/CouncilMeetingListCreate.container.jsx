import React, { Component } from "react";
import { Link } from "react-router";
import DatePicker from "react-datepicker";
import moment from "moment";
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

  handleDateChange(formname, date) {
    Validate.updateForm(formname, "date", date);
  }

  handleChange(event) {
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
      cm.date = cm.date.toDate();
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
                There can be only one meeting per date.
              </p>
              <div className="two fields">
                <div className="field">
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={newCouncilMeeting.values.date}
                    onChange={this.handleDateChange.bind(this, "newCouncilMeeting")}
                  />
                  <ValidateError errors={newCouncilMeeting.errors} model="newCouncilMeeting" field="date" />
                </div>
                <div className="field">
                  <button className="ui primary button" onClick={this.handleClick.bind(this, "save", "")}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="field">
              <h2 className="ui dividing header">
                Change meetings date {
                  updateCouncilMeeting.values.date ? updateCouncilMeeting.values.date.format("DD/MM/YYYY") : ""
                }
              </h2>
              <p>
                NOTE: does not change deadlines for already created theses. Meaning that they'll show up being
                late/early in the system and while not damaging to the app's logic it might be worth reminding
                the people about.
              </p>
              <div className="two fields">
                <div className="field">
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={updateCouncilMeeting.values.date}
                    onChange={this.handleDateChange.bind(this, "updateCouncilMeeting")}
                  />
                  <ValidateError errors={updateCouncilMeeting.errors} model="updateCouncilMeeting" field="date" />
                </div>
                <div className="field">
                  <button className="ui green button" onClick={this.handleClick.bind(this, "update", "")}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <h2 className="ui dividing header">Upcoming councilmeetings</h2>
            <div className="ui checkbox">
              <input
                type="checkbox"
                checked={this.state.showOld ? "true" : ""}
                onChange={this.handleChange.bind(this, "toggleShowOld")}
              />
              <label>Show also past dates</label>
            </div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th onClick={this.handleClick.bind(this, "sort", "date")}>Date</th>
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
