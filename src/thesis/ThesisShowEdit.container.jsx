import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import moment from "moment";

import GraderContainer from "../grader/GraderListCreateUpdate.container";
import GradersDropdown from "../ui/GradersDropdown.component";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";

export class ThesisShow extends Component {

  constructor() {
    super();
    this.state = {
      updateThesis: Validate.createForm("updateThesis", "thesisEdit"),
      editable: false,
      grading: false,
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("updateThesis", "tse", (updateThesis) => {
      this.setState({ updateThesis, });
    });
    const thesis = this.findThesisFromProps(this.props);
    if (thesis) {
      Validate.replaceForm("updateThesis", thesis);
    }
  }

  componentWillUnmount() {
    Validate.unsubscribe("tse");
  }

  componentWillReceiveProps(newProps) {
    const thesis = this.findThesisFromProps(newProps);
    if (thesis) {
      Validate.replaceForm("updateThesis", thesis);
    }
  }

  findThesisFromProps(props) {
    let thesisId;
    try {
      thesisId = parseInt(props.params.id, 10);
    } catch (e) {
      return undefined;
    }
    return props.theses.find(thesis => {
      if (thesis.id === thesisId) {
        return thesis;
      }
    });
  }

  handleClick(button, event) {
    if (button === "edit") {
      this.setState({
        editable: true,
      });
    } else if (button === "grade") {
      this.setState({
        grading: true,
      });
    } else if (button === "stop-edit") {
      this.setState({
        editable: false,
      });
    } else if (button === "save" && Validate.isFormValid("updateThesis")) {
      this.props.updateThesis(this.state.updateThesis.values);
    } else if (button === "download") {
      this.props.downloadTheses([this.state.updateThesis.values.id]);
    } else if (button === "delete" && confirm("Are you sure you want to delete this thesis? All data will be lost.")) {
      this.props.deleteThesis(this.state.updateThesis.values.id);
    }
  }

  handleReminderClick(action, reminderType, event) {
    // console.log(action, reminder)
    if (action === "sendReminder") {
      const thesisId = Validate.getForm("updateThesis").values.id;
      this.props.sendReminder(thesisId, reminderType);
    } else if (action === "setDone") {
      const tp = Validate.getForm("updateThesis").values.ThesisProgress;
      if (reminderType === "EthesisEmail") {
        tp.ethesisDone = true;
      } else if (reminderType === "GraderEvalEmail") {
        tp.graderEvalDone = true;
      } else if (reminderType === "PrintEmail") {
        tp.printDone = true;
      }
      if (confirm("Are you sure you want to manually overwrite this reminder done?")) {
        this.props.updateThesisProgress(tp);
      }
    }
  }

  handleChange(name, event) {
    // professors are restricted from editing anything else but grader evaluation
    if (this.state.editable || (this.state.grading && name === "graderEval")) {
      Validate.updateForm("updateThesis", name, event.target.value);
    }
  }

  renderThesisAuthor() {
    const { updateThesis } = this.state;
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Thesis Author</h3>
        <div className="three fields">
          <div className="field">
            <label>First name</label>
            <input
              type="text"
              value={updateThesis.values.authorFirstname}
              onChange={this.handleChange.bind(this, "authorFirstname")}
              placeholder="First Name"
            />
            <ValidateError errors={updateThesis.errors} model="thesisEdit" field="authorFirstname" />
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              type="text"
              value={updateThesis.values.authorLastname}
              onChange={this.handleChange.bind(this, "authorLastname")}
              placeholder="Last Name"
            />
            <ValidateError errors={updateThesis.errors} model="thesisEdit" field="authorLastname" />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={updateThesis.values.authorEmail}
              onChange={this.handleChange.bind(this, "authorEmail")}
              placeholder="Email Address"
            />
            <ValidateError errors={updateThesis.errors} model="thesisEdit" field="authorEmail" />
          </div>
        </div>
      </div>
    );
  }

  renderThesisInformation() {
    const { updateThesis } = this.state;
    const user = this.state.updateThesis.values.User;
    const instructor = user ? `${user.firstname} ${user.lastname}` : "";
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Thesis Information</h3>
        <div className="three fields">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={updateThesis.values.title}
              onChange={this.handleChange.bind(this, "title")}
              placeholder="Title"
            />
            <ValidateError errors={updateThesis.errors} model="thesisEdit" field="title" />
          </div>
            <div className="field">
              <label>Studyfield</label>
              <select
                className="ui fluid search dropdown"
                value={updateThesis.values.StudyFieldId}
                onChange={this.handleChange.bind(this, "StudyFieldId")}
              >
                <option key="0" value="">Select field</option>
                { this.props.studyfields.map((field, index) =>
                  <option key={index} value={field.id}>
                    { field.name }
                  </option>
                )}
              </select>
            <ValidateError errors={updateThesis.errors} model="thesisEdit" field="StudyFieldId" />
          </div>
          <div className="field">
            <label>Grade</label>
            <select
              className="ui fluid search dropdown"
              value={updateThesis.values.grade}
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
            <ValidateError errors={updateThesis.errors} model="thesisEdit" field="grade" />
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <label>Urkund</label>
            <div className="ui right icon input">
              <i className="external icon">
                <a href={updateThesis.values.urkund} target="_blank" className="icon-link"></a>
              </i>
              <input
                type="text"
                placeholder="Urkund link"
                value={updateThesis.values.urkund}
                onChange={this.handleChange.bind(this, "urkund")}
              />
            </div>
            <ValidateError errors={updateThesis.errors} model="thesisEdit" field="urkund" />
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
            <ValidateError errors={updateThesis.errors} model="thesisEdit" field="instructor" />
          </div>
        </div>
      </div>
    );
  }

  renderThesisFiles() {
    const { updateThesis } = this.state;
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Thesis Files</h3>
        <p>
          Click the link? to open the pdf in a new tab.
        </p>
        <div className="three fields">
          <div className="field">
            <label>Review</label>
            <div className="ui right icon input">
              <i className="external icon">
                <a href={updateThesis.values.urkund} target="_blank" className="icon-link"></a>
              </i>
              <input
                type="text"
                placeholder="review"
              />
            </div>
          </div>
          <div className="field">
            <label>Abstract</label>
            <input
              type="text"
              placeholder="abstract"
            />
          </div>
        </div>
      </div>
    );
  }

  renderGraders() {
    const { updateThesis } = this.state;
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Graders</h3>
        <div className="field">
          <label>Select Graders</label>
          <GradersDropdown formname="updateThesis" graders={this.props.Graders}
            selected={updateThesis.values.Graders} editable={this.state.editable}/>
        </div>
        <ValidateError errors={updateThesis.errors} model="thesisEdit" field="Graders" />
      </div>
    );
  }

  renderPickCouncilmeeting() {
    const { updateThesis } = this.state;
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
          value={updateThesis.values.CouncilMeetingId}
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

  renderGraderEval() {
    const { updateThesis } = this.state;
    return (
      <div className="m-bot">
        <h2 className="ui dividing header">Grader evaluation</h2>
        <div className="field">
          <textarea
            value={updateThesis.values.graderEval || ""}
            onChange={this.handleChange.bind(this, "graderEval")}
          ></textarea>
        </div>
      </div>
    );
  }

  renderReminder(name, type, reminder, isDone) {
    return (
      <div className="field">
        <div className="ui right input">
          <h3 className="ui header">{ name }</h3>
          <div className="ui checkbox m-left">
            <input type="checkbox" readOnly="true" checked={isDone ? "true" : ""} />
            <label></label>
          </div>
        </div>
        <div className="three fields">
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
          { isDone ?
            <div className="field">
            </div>
            :
            <div>
              <div className="field">
                <label>&nbsp;</label>
                <button className="ui blue button" onClick={this.handleReminderClick.bind(this, "sendReminder", type)}>
                  Send reminder
                </button>
              </div>
            </div>
          }
          { isDone ?
            <div className="field">
            </div>
            :
            <div>
              <div className="field">
                <label>&nbsp;</label>
                <button className="ui red button" onClick={this.handleReminderClick.bind(this, "setDone", type)}>
                  Set done
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

  renderSentReminders() {
    const thesisProgress = this.state.updateThesis.values.ThesisProgress;
    return (
      <div>
        <h2 className="ui dividing header">Sent reminders</h2>
        { this.renderReminder("Ethesis Reminder", "EthesisReminder", thesisProgress.EthesisEmail || {}, thesisProgress.ethesisDone) }
        { this.renderReminder("Grader Evaluation Reminder", "GraderEvalReminder", thesisProgress.GraderEvalEmail || {}, thesisProgress.graderEvalDone) }
        { this.renderReminder("Print Thesis Reminder", "PrintReminder", thesisProgress.PrintEmail || {}, thesisProgress.printDone) }
      </div>
    );
  }

  render() {
    const { updateThesis } = this.state;
    const role = this.props.user.role;
    return (
      <div className="ui form">
        <h2 className="ui dividing header">{updateThesis.values.title}</h2>
        { role === "admin" ?
          <div className="field">
            { this.state.editable ?
              <div className="ui red button" onClick={this.handleClick.bind(this, "stop-edit")}>Stop editing</div>
              :
              <div className="ui green button" onClick={this.handleClick.bind(this, "edit")}>Edit</div>
            }
            <div className="ui blue button" onClick={this.handleClick.bind(this, "save")}>Save</div>
            <div className="ui red button" onClick={this.handleClick.bind(this, "delete")}>Delete</div>
          </div>
           :
          role === "professor" ?
          <div className="field">
            { this.state.grading ?
              <div className="ui blue button" onClick={this.handleClick.bind(this, "save")}>Save</div>
              :
              <div className="ui green button" onClick={this.handleClick.bind(this, "grade")}>Evaluate graders</div>
            }
          </div>
           :
          <div className="field"></div>
        }
        { this.renderThesisAuthor() }
        { this.renderThesisInformation() }
        { /*this.renderThesisFiles()*/ }
        { this.renderGraders() }
        <GraderContainer editable={this.state.editable}/>
        { this.renderPickCouncilmeeting() }
        { this.renderGraderEval() }
        { role === "admin" ?
          this.renderSentReminders()
            :
          <div></div>
        }
        <h2 className="ui dividing header">Print documents</h2>
        <div className="field">
          <button className="ui blue button" onClick={this.handleClick.bind(this, "download")}>Download as PDF</button>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { updateThesis, deleteThesis, downloadTheses } from "./thesis.actions";
import { updateGraders } from "../grader/grader.actions";
import { updateUser } from "../user/user.actions";
import { sendReminder } from "../email/email.actions";
import { updateThesisProgress } from "../thesis/thesis.actions";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  const thesis = state.get("thesis");
  const councilmeeting = state.get("councilmeeting");
  const sfreducer = state.get("studyfield");
  const grader_r = state.get("grader");
  return {
    user: auth.get("user").toJS(),
    theses: thesis.get("theses").toJS(),
    councilmeetings: councilmeeting.get("councilmeetings").toJS(),
    studyfields: sfreducer.get("studyfields").toJS(),
    Graders: grader_r.get("graders").toJS(),
  };
};

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
  sendReminder(thesisId, type) {
    dispatch(sendReminder(thesisId, type));
  },
  updateThesisProgress(tp) {
    dispatch(updateThesisProgress(tp));
  },
  deleteThesis(thesisId) {
    dispatch(deleteThesis(thesisId));
  },
  downloadTheses(theses) {
    dispatch(downloadTheses(theses));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisShow);
