import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import moment from "moment";

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
        console.log(thesis)
        return thesis;
      }
    });
    if (typeof foundThesis !== "undefined") {
      console.log(foundThesis)
      this.setState({
        thesis: foundThesis,
      });
    }
  }

  handleInputValueChange(name, event) {
    // console.log(name);
    // event.preventDefault();
    // const change = {
    //   errors: this.state.errors,
    // };
    // change[name] = event.target.value;
    // console.log(change);
    // const newErrors = validateField(name, event.target.value, "thesis");
    // console.log(newErrors);
    // change.errors[`thesis_${name}`] = newErrors;
    // this.setState(change);
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
              onChange={this.handleInputValueChange.bind(this, "fname")}
              placeholder="First Name"
            />
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              type="text"
              value={this.state.thesis.authorLastname}
              onChange={this.handleInputValueChange.bind(this, "lname")}
              placeholder="Last Name"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={this.state.thesis.authorEmail}
              onChange={this.handleInputValueChange.bind(this, "email")}
              placeholder="Email Address"
            />
          </div>
        </div>
      </div>
    );
  }

  renderThesisInformation() {
    const instructor = this.state.thesis.User == undefined ? "" : `${this.state.thesis.User.name}`
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Thesis Information</h3>
        <div className="three fields">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={this.state.thesis.title}
              onChange={this.handleInputValueChange.bind(this, "title")}
              placeholder="Title"
            />
          </div>
          {/*<div className="three wide field">*/}
            <div className="field">
              <label>Studyfield</label>
              <select
                className="ui fluid search dropdown"
                value={this.state.thesis.StudyFieldId}
                onChange={this.handleInputValueChange.bind(this, "StudyFieldId")}
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
              onChange={this.handleInputValueChange.bind(this, "grade")}
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
                <a href="http://www.w3schools.com" target="_blank" className="icon-link"></a>
              </i>
              <input
                type="text"
                name="email"
                placeholder="E-mail address"
                readOnly="true"
                value={this.state.thesis.urkund}
              />
            </div>
          </div>
          <div className="field">
            <label>Ethesis</label>
            <div className="ui right icon input">
            <i className="external icon">
              <a href="http://www.w3schools.com" target="_blank" className="icon-link"></a>
            </i>
              <input
                type="text"
                name="email"
                placeholder="E-mail address"
                readOnly="true"
                value={this.state.thesis.ethesis}
              />
            </div>
          </div>
          <div className="field">
            <label>Instructor</label>
            <input
              type="text"
              value={instructor}
              onChange={this.handleInputValueChange.bind(this, "urkund")}
              placeholder="Link to Urkund"
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
          onChange={this.handleInputValueChange.bind(this, "CouncilMeetingId")}
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

  renderSentReminders() {
    const thesisProgress = this.state.thesis.ThesisProgress || {};
    return (
      <div>
        <h2 className="ui dividing header">Sent reminders</h2>
        <div className="field">
          <div className="ui right input">
            <h3 className="ui header">Ethesis Reminder</h3>
            <div className="ui checkbox m-left">
              <input type="checkbox" />
              <label></label>
            </div>
          </div>
          <div className="four fields">
            <div className="field">
              <label>Student</label>
              <p>name</p>
            </div>
            <div className="field">
              <label>Last sent</label>
              <p>1.1.2016</p>
              {/*<input type="text" name="shipping[last-name]" placeholder="Last Name" />*/}
            </div>
            <div className="field">
              <label>Deadline</label>
              <p>1.4.2016</p>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <button className="ui blue button">Send reminder</button>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="ui right input">
            <h3 className="ui header">Grader Evaluation Reminder</h3>
            <div className="ui checkbox m-left">
              <input type="checkbox" />
              <label></label>
            </div>
          </div>
          <div className="four fields">
            <div className="field">
              <label>Professor</label>
              <p>name</p>
            </div>
            <div className="field">
              <label>Last sent</label>
              <p>1.1.2016</p>
              {/*<input type="text" name="shipping[last-name]" placeholder="Last Name" />*/}
            </div>
            <div className="field">
              <label>Deadline</label>
              <p>1.4.2016</p>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <button className="ui blue button">Send reminder</button>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="ui right input">
            <h3 className="ui header">Print Thesis Reminder</h3>
            <div className="ui checkbox m-left">
              <input type="checkbox" />
              <label></label>
            </div>
          </div>
          <div className="four fields">
            <div className="field">
              <label>Print-person</label>
              <p>name</p>
            </div>
            <div className="field">
              <label>Last sent</label>
              <p>1.1.2016</p>
              {/*<input type="text" name="shipping[last-name]" placeholder="Last Name" />*/}
            </div>
            <div className="field">
              <label>Deadline</label>
              <p>1.4.2016</p>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <button className="ui blue button">Send reminder</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="ui form">
        <h2 className="ui dividing header">{this.state.thesis.title}</h2>
        <div className="field">
          <div className="ui green button">Edit</div>
        </div>
        { this.renderThesisAuthor() }
        { this.renderThesisInformation() }
        <GraderList graders={this.state.thesis.Graders} />
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
import { updateGrader } from "../grader/grader.actions";
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
  updateGrader(grader) {
    dispatch(updateGrader(grader));
  },
  updateUser(user) {
    dispatch(updateUser(user));
  },
  sendNotification(object) {
    dispatch(sendNotification(object));
  },
  deleteThesis(thesis) {
    dispatch(deleteThesis(thesis));
  },
  updateThesisProgress(thesis) {
    dispatch(updateThesisProgress(thesis));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisShow);
