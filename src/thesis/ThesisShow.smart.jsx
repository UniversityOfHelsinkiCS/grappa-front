import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import moment from "moment";

import { validateField, validateModel } from "../config/Validator";
import GraderList from "../grader/GraderList.component";

export class ThesisShow extends Component {
  constructor() {
    super();
    this.state = {
      thesis: {
        Graders: [],
        StudyField: {
          name: "",
        },
        User: {},
      },
      errors: {},
      editable: false,
      delete: false,
    };
  }

  componentWillMount() {
    this.findThesisFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.findThesisFromProps(newProps);
  }

  findThesisFromProps(props) {
    let thesisId;
    try {
      thesisId = parseInt(props.params.id, 10);
    } catch (e) {
      return;
    }
    const foundThesis = props.theses.find(thesis => {
      if (thesis.id === thesisId) {
        console.log(thesis);
        return thesis;
      }
    });
    if (typeof foundThesis !== "undefined") {
      console.log(foundThesis);
      this.setState({
        thesis: foundThesis,
      });
    }
  }

  handleClick(button, event) {
    if (button === "edit") {
      this.setState({
        editable: true,
      });
    } else if (button === "stop-edit") {
      this.setState({
        editable: false,
      });
    } else if (button === "save") {
      this.props.updateThesis(this.state.thesis);
      // this.props.updateGraders(this.state.Graders);
    }
  }

  handleChange(name, event) {
    event.preventDefault();
    console.log("yo editing");
    if (this.state.editable) {
      const change = {
        thesis: this.state.thesis,
        errors: this.state.errors,
        // editable: this.state.editable,
      };
      change.thesis[name] = event.target.value;
      const newErrors = validateField(name, event.target.value, "thesis");
      change.errors[`thesis_${name}`] = newErrors;
      this.setState(change);
    }
  }

  renderThesisAuthor() {
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Thesis Author</h3>
        <div className="three fields">
          <div className="field">
            <label>First name</label>
            <input
              type="text"
              value={this.state.thesis.authorFirstname}
              onChange={this.handleChange.bind(this, "authorFirstname")}
              placeholder="First Name"
            />
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              type="text"
              value={this.state.thesis.authorLastname}
              onChange={this.handleChange.bind(this, "authorLastname")}
              placeholder="Last Name"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={this.state.thesis.authorEmail}
              onChange={this.handleChange.bind(this, "authorEmail")}
              placeholder="Email Address"
            />
          </div>
        </div>
      </div>
    );
  }

  renderThesisInformation() {
    const instructor = this.state.thesis.User === undefined ? "" : `${this.state.thesis.User.name}`;
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Thesis Information</h3>
        <div className="three fields">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={this.state.thesis.title}
              onChange={this.handleChange.bind(this, "title")}
              placeholder="Title"
            />
          </div>
          {/*<div className="three wide field">*/}
            <div className="field">
              <label>Studyfield</label>
              <select
                className="ui fluid search dropdown"
                value={this.state.thesis.StudyFieldId}
                onChange={this.handleChange.bind(this, "StudyFieldId")}
              >
                <option key="0" value="">Select field</option>
                { this.props.studyfields.map((field, index) =>
                  <option key={index} value={field.id}>
                    { field.name }
                  </option>
                )}
              </select>
            </div>
          {/*</div>*/}
          {/*<div className="five wide field">*/}
          <div className="field">
            <label>Grade</label>
            <select
              className="ui fluid search dropdown"
              value={this.state.thesis.grade}
              onChange={this.handleChange.bind(this, "grade")}
              name="thesis[grade]"
            >
              <option value="">Select grade</option>
              <option value="Approbatur">Approbatur</option>
              <option value="Lubenter Approbatur">Lubenter Approbatur</option>
              <option value="Non Sine Laude Approbatur">Non Sine Laude Approbatur</option>
              <option value="Cum Laude Approbatur">Cum Laude Approbatur</option>
              <option value="Magna Cum Laude Approbatur">Magna Cum Laude Approbatur</option>
              <option value="Eximia Cum Laude Approbatur">Eximia Cum Laude Approbatur</option>
              <option value="Laudatur">Laudatur</option>
            </select>
          </div>
          {/*</div>*/}
        </div>
        <div className="three fields">
          <div className="field">
            <label>Urkund</label>
            <div className="ui right icon input">
              <i className="external icon">
                <a href={this.state.thesis.urkund} target="_blank" className="icon-link"></a>
              </i>
              <input
                type="text"
                placeholder="Urkund link"
                value={this.state.thesis.urkund}
                onChange={this.handleChange.bind(this, "urkund")}
              />
            </div>
          </div>
          <div className="field">
            <label>Ethesis</label>
            <div className="ui right icon input">
            <i className="external icon">
              <a href={this.state.thesis.ethesis} target="_blank" className="icon-link"></a>
            </i>
              <input
                type="text"
                placeholder="Ethesis link"
                value={this.state.thesis.ethesis || ""}
                onChange={this.handleChange.bind(this, "ethesis")}
              />
            </div>
          </div>
          <div className="field">
            <label>Instructor</label>
            <input
              type="text"
              placeholder="Link to Urkund"
              value={instructor}
              onChange={this.handleChange.bind(this, "instructor")}
              disabled="true"
            />
          </div>
        </div>
      </div>
    );
  }

  renderPickCouncilmeeting() {
    const today = new Date();
    const filtered = this.props.councilmeetings.filter(meeting => {
      if (new Date(meeting.date) >= today) {
        return meeting;
      }
    });
    const formatted = filtered.map(meeting => {
      return {
        id: meeting.id,
        date: moment(new Date(meeting.date)).format("DD/MM/YYYY"),
      };
    });
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Date of Councilmeeting</h3>
        <select className="ui fluid search dropdown"
          value={this.state.thesis.CouncilMeetingId}
          onChange={this.handleChange.bind(this, "CouncilMeetingId")}
        >
          { formatted.map((meeting, index) =>
            <option key={ index } value={ meeting.id } >
              { meeting.date }
            </option>
          )}
        </select>
      </div>
    );
  }

  renderReminder(name, reminder, isDone) {
    return (
      <div className="field">
        <div className="ui right input">
          <h3 className="ui header">{ name }</h3>
          <div className="ui checkbox m-left">
            <input type="checkbox" readOnly="true" checked={isDone ? "true" : ""} />
            <label></label>
          </div>
        </div>
        <div className="four fields">
          <div className="field">
            <label>Recipient</label>
            <p>{ reminder.to }</p>
          </div>
          <div className="field">
            <label>Last sent</label>
            { reminder.lastSent ?
              <p>{ moment(new Date(reminder.lastSent)).format("DD/MM/YYYY HH:mm") }</p>
              :
              <p></p>
            }
          </div>
          <div className="field">
            <label>Deadline</label>
            { reminder.deadline ?
              <p>{ moment(new Date(reminder.deadline)).format("DD/MM/YYYY HH:mm") }</p>
              :
              <p></p>
            }
          </div>
            { isDone ?
              <div className="field">
              </div>
              :
              <div className="field">
                <label>&nbsp;</label>
                <button className="ui blue button">Send reminder</button>
              </div>
            }
        </div>
      </div>
    );
  }

  renderSentReminders() {
    const thesisProgress = this.state.thesis.ThesisProgress || {};
    return (
      <div>
        <h2 className="ui dividing header">Sent reminders</h2>
        { this.renderReminder("Ethesis Reminder", thesisProgress.EthesisEmail || {}, thesisProgress.ethesisDone) }
        { this.renderReminder("Grader Evaluation Reminder", thesisProgress.GraderEvalEmail || {}, thesisProgress.graderEvalDone) }
        { this.renderReminder("Print Thesis Reminder", thesisProgress.PrintEmail || {}, thesisProgress.printDone) }
      </div>
    );
  }

  render() {
    return (
      <div className="ui form">
        <h2 className="ui dividing header">{this.state.thesis.title}</h2>
        <div className="field">
          { this.state.editable ?
            <div className="ui red button" onClick={this.handleClick.bind(this, "stop-edit")}>Stop editing</div>
            :
            <div className="ui green button" onClick={this.handleClick.bind(this, "edit")}>Edit</div>
          }
          <div className="ui blue button" onClick={this.handleClick.bind(this, "save")}>Save</div>
        </div>
        { this.renderThesisAuthor() }
        { this.renderThesisInformation() }
        <GraderList Graders={this.state.thesis.Graders} editable={this.state.editable}/>
        { this.renderPickCouncilmeeting() }
        <h2 className="ui dividing header">Abstract</h2>
        <div className="field">
          <textarea></textarea>
        </div>
        <h2 className="ui dividing header">Grader evaluation</h2>
        <div className="field">
          <textarea></textarea>
        </div>
        { this.renderSentReminders() }
        <h2 className="ui dividing header">Print</h2>
        <div className="field">
          <button className="ui blue button">Open as PDF</button>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { updateThesis, deleteThesis } from "./thesis.actions";
import { updateGraders } from "../grader/grader.actions";
import { updateUser } from "../user/user.actions";
import { sendNotification } from "../email/email.actions";
import { updateThesisProgress } from "../thesisprogress/thesisprogress.actions";

/**
 * A special function used to define what the form of the data is that is gotten from the state.
 * @return (Object) {user, theses} An object containing a list of all the thesis visible to
 * your role and a list of all the users.
 */
const mapStateToProps = (state) => {
  const user = state.get("auth");
  const thesis = state.get("thesis");
  const councilmeeting = state.get("councilmeeting");
  const sfreducer = state.get("studyfield");
  return {
    user: user.get("user").toJS(),
    theses: thesis.get("theses").toJS(),
    councilmeetings: councilmeeting.get("councilmeetings").toJS(),
    studyfields: sfreducer.get("studyfields").toJS(),
  };
};

/**
* A special function used to define and dispatch the relevant data to the right
* actions in thesis.actions.
*/
const mapDispatchToProps = (dispatch) => ({
  updateThesis(thesis) {
    dispatch(updateThesis(thesis));
  },
  updateGraders(graders) {
    dispatch(updateGraders(graders));
  },
  // updateUser(user) {
  //   dispatch(updateUser(user));
  // },
  sendNotification(object) {
    dispatch(sendNotification(object));
  },
  deleteThesis(thesis) {
    dispatch(deleteThesis(thesis));
  },
  // updateThesisProgress(thesis) {
  //   dispatch(updateThesisProgress(thesis));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisShow);
