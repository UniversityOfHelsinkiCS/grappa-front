/**
* ThesisShow.smart for displaying and running the view of a single thesis.
* It contains the component for displaying the needed displayable data, and
* the container in charge of connecting the component to the reducers and actions
* in charge of state changes.
*/

import React, { Component } from "react";
import { updateThesis, deleteThesis } from "./thesis.actions";
import { updateGrader } from "../grader/grader.actions";
import { updateUser } from "../user/user.actions";
import { sendNotification } from "../email/email.actions";
import { updateThesisProgress } from "../thesisprogress/thesisprogress.actions";

export class ThesisShow extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInstructorChange = this.handleInstructorChange.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
    this.handleGrNameChange = this.handleGrNameChange.bind(this);
    this.handleGrTitleChange = this.handleGrTitleChange.bind(this);
    this.handleEval = this.handleEval.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.dateTimeFormatter = this.dateTimeFormatter.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      thesis: {},
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
        return thesis;
      }
    });
    if (typeof foundThesis !== "undefined") {
      this.state.thesis = foundThesis;
    }
  }

  /**
  * Handler method for defining how the user input is handled in multiple input fields.
  * @param (String) name Defines which field is in question, eg. "author" or "title".
  */
  handleChange(name, event) {
    const thesispointer = this.state.thesis;
    thesispointer[name] = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }

  /**
  * Handles the pressing of the "Send Notification" buttons, calling the appropriate
  * action in each instance.
  * @param (String) name Defines which button is in question, "ethesis" or "eval".
  */
  handleNotification(name, event) {
    event.preventDefault();
    this.props.sendNotification({ thesis: this.state.thesis, type: name });
  }

  handleInstructorChange(event) {
    const thesispointer = this.state.thesis;
    thesispointer.User.name = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }

  /**
  * Two handler methods for handling the input fields for repective graders.
  * @param (Integer) id Defines in which iteration of the Graders list the method
  * was called, giving the right index for pointing to the correct object.
  */
  handleGrNameChange(id, event) {
    event.preventDefault();
    const thesispointer = this.state.thesis;
    thesispointer.Graders[id].name = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }
  handleGrTitleChange(id, event) {
    event.preventDefault();
    const thesispointer = this.state.thesis;
    thesispointer.Graders[id].title = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }

  /**
  * Two methods that on clicking their respective button remove the readOnly attribute
  * of their respective field/s.
  */
  handleEval() {
    document.getElementsByTagName("textarea")[1].removeAttribute("readOnly");
  }
  handleEdit() {
    const graders = this.state.thesis.Graders;
    for (let i = 0; i < 6 + (graders.length * 2); i++) {
      document.getElementsByTagName("input")[i].removeAttribute("readOnly");
    }
    document.getElementsByTagName("select")[0].removeAttribute("disabled");
  }
  /**
  * Two methods that on clicking their respective button add the readOnly attribute
  * to their respective field/s and call the appropriate actions to save the user
  * input given.
  */
  handleSubmit() {
    document.getElementsByTagName("textarea")[1].readOnly = true;
    this.props.updateThesis(this.state.thesis);
    this.props.updateThesisProgress(this.state.thesis);
  }
  handleSave() {
    this.props.updateThesis(this.state.thesis);

    const graders = this.state.thesis.Graders;
    for (let i = 0; i < graders.length; i++) {
      this.props.updateGrader(graders[i]);
    }

    this.props.updateUser(this.state.thesis.User);
    for (let i = 0; i < 6 + (graders.length * 2); i++) {
      document.getElementsByTagName("input")[i].readOnly = true;
    }
    document.getElementsByTagName("select")[0].disabled = true;
  }
  handleDelete(type) {
    if (type === "initial") {
      this.setState({ delete: true });
    } else if (type === "confirm") {
      this.props.deleteThesis(this.state.thesis);
    } else {
      this.setState({ delete: false });
    }
  }
  dateTimeFormatter(date) {
    const origDate = new Date(date);
    return `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}
    ${origDate.getHours()}:${origDate.getMinutes()}:${origDate.getSeconds()}`;
  }
  dateFormatter(date) {
    const origDate = new Date(date);
    return `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;
  }

  /**
  * The main segment of the rendering methods which is called from the original
  * render if the needed data is available. All other rendering segments are called
  * from this method.
  */
  renderContent() {
    const thesis = this.state.thesis;
    return (
      <div>
        <div className="ui form">
          <div className="field">
            <div>Title:</div>
            <input type="text" readOnly value={thesis.title} onChange={ this.handleChange.bind(this, "title") } />
            <div>Author:</div>
            <input type="text" readOnly value={ thesis.author } onChange={ this.handleChange.bind(this, "author") } />
            <div>Email:</div>
            <input type="text" readOnly value={ thesis.email } onChange={ this.handleChange.bind(this, "email") } />
            <div>Grade:</div>
            <select
              disabled
              className="ui fluid search dropdown"
              value={thesis.grade}
              onChange={this.handleChange.bind(this, "grade")}
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
          <div className="field">
            <div>Instructor:</div>
            <input type="text" readOnly value={ thesis.User.name } onChange={ this.handleInstructorChange.bind(this) } />
          </div>
          <div className="field">
            <div>Ethesis link:</div>
            <input type="text" readOnly value={ thesis.ethesis } onChange={ this.handleChange.bind(this, "ethesis") } />
          </div>
          <div className="field">
            <div>Urkund link:</div>
            <input type="text" readOnly value={ thesis.urkund } onChange={ this.handleChange.bind(this, "urkund") } />
          </div>
          <h4 className="ui dividing header">Abstract</h4>
          <textarea className="abstract" readOnly value={ thesis.abstract } rows="5" cols="30" />
          <div className="field">
            { this.renderGraders() }
          </div>
          <h4 className="ui dividing header">Grader Evaluation</h4>
          <textarea className="eval" readOnly value={ this.state.thesis.graderEvaluation } onChange={ this.handleChange.bind(this, "graderEvaluation") } rows="5" cols="30" />
          { this.renderGraderButtons() }
        </div>
        <h4 className="ui dividing header">Notifications</h4>
        { this.renderThesisProgress() }
        <h3 id="deadlineReminder">Deadline: { this.dateFormatter(thesis.deadline) }</h3>
        { this.renderThesisEditButtons() }
      </div>
    );
  }

  /**
  * A method to convert a date into a DD/MM/YY format.
  */
  renderDates(date) {
    const origDate = new Date(date);
    return `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;
  }

  /**
  * The method for rendering the buttons related to adding the Grader Evaluation
  * if the appropriate user is signed in.
  */
  renderGraderButtons() {
    const user = this.props.user;
    if (user.role === "professor") {
      return (
        <div>
          <button className="ui primary button" id="editButton" onClick={ this.handleEval.bind(this) }>Evaluate Graders</button>
          <button className="ui primary button" id="editButton" onClick={ this.handleSubmit.bind(this) }>Submit Evaluation</button>
        </div>
      );
    }
    return false;
  }

  /**
  * The method for rendering the buttons related to editing the thesis if the
  * appropriate user is signed in.
  */
  renderThesisEditButtons() {
    const user = this.props.user;
    if (user.role === "admin" || user.name === this.state.instructor) {
      if (this.state.delete) {
        return (
          <div>
            <h3>Deletion is unreversable, are you sure you wish to proceed?</h3>
            <button className="ui primary button" id="confirmdeleteButton" onClick={ this.handleDelete.bind(this, "confirm") }>Confirm Deletion</button>
            <button className="ui primary button" id="canceldeleteButton" onClick={ this.handleDelete.bind(this, "cancel") }>Cancel Deletion</button>
          </div>
        );
      }
      return (
        <div>
          <button className="ui primary button" id="editButton" onClick={ this.handleEdit }>Edit</button>
          <button className="ui primary button" id="saveButton" onClick={ this.handleSave }>Save</button>
          <button className="ui primary button" id="deleteButton" onClick={ this.handleDelete.bind(this, "initial") }>Delete</button>
        </div>
      );
    }
    return false;
  }

  /**
  * The method for rendering the buttons related to sending reminders. If no more
  * corresponding data is needed, the button is disabled.
  */
  renderReminderButton(ethesis, evalGraders, name) {
    if (name === "ethesis") {
      if (ethesis === "Missing") {
        return (
          <button className="ui blue tiny button" onClick={ this.handleNotification.bind(this, "student") } >Send reminder</button>
        );
      }
      return (
        <button className="ui disabled blue tiny button" >Send reminder</button>
      );
    }
    if (evalGraders === "Not Done") {
      return (
        <button className="ui blue tiny button" onClick={ this.handleNotification.bind(this, "professor") } >Send reminder</button>
      );
    }
    return (
      <button className="ui disabled blue tiny button" >Send reminder</button>
    );
  }

  /**
  * The method for rendering the graders related to the thesis.
  */
  renderGraders() {
    const graders = this.state.thesis.Graders;
    const noGraders = graders === undefined || graders.length === 0;
    return (
      <div className="field">
        <h4 className="ui dividing header">Graders</h4>
        { noGraders ?
          <p>No graders found.</p>
          :
          <div>
            {
              graders.map(grader =>
                <div key={grader.id} className="field">
                  Name: <input type="text" readOnly value={grader.name} onChange={ this.handleGrNameChange.bind(this, graders.indexOf(grader)) } />
                  Title: <input type="text" readOnly value={grader.title} onChange={ this.handleGrTitleChange.bind(this, graders.indexOf(grader)) } />
                </div>
              )
            }
          </div>
        }
      </div>
    );
  }

  /**
  * The method for rendering the data related to the ethesis link, grader evaluation
  * status and the availability of needed printable files.
  */
  renderThesisProgress() {
    const thesis = this.state.thesis;
    const noThesProg = thesis.ThesisProgress === null;
    let ethesis = "Missing";
    let evalGraders = "Not Done";
    let docReady = "Documents missing";
    if (thesis.ethesis !== "" && thesis.ethesis !== null) {
      ethesis = "Added";
    }
    if (thesis.ThesisProgress !== null && thesis.ThesisProgress !== undefined && thesis.ThesisProgress.gradersStatus) {
      evalGraders = "Done";
      if (thesis.graderEvaluation === null) {
        evalGraders = "Not Needed";
      }
    }
    if (ethesis === "Added" && evalGraders === "Done") {
      docReady = "Documents available";
    }
    return (
      <div className="field">
        { noThesProg ?
          <p>No thesis progress found</p>
          :
          <div>
            {
              <div>
                <div className="ui form">
                  <div className="three fields">
                    <div className="field">Name and status</div>
                    <div className="field">Date when last notification sent</div>
                    <div className="field">Buttons for sending reminders</div>
                  </div>

                  <div className="three fields">
                    <div className="field">
                      Ethesis Link
                      <div className="ui tag label"> { ethesis } </div>
                    </div>
                    <div className="field">
                      <p>{ this.dateTimeFormatter(thesis.ThesisProgress.ethesisReminder) }</p>
                    </div>
                    <div className="field">
                      { this.renderReminderButton(ethesis, evalGraders, "ethesis") }
                    </div>
                  </div>

                  <div className="three fields">
                    <div className="field">
                      Grader Evaluation
                      <div className="ui tag label"> { evalGraders } </div>
                    </div>
                    <div className="field">
                      <p>{ this.dateTimeFormatter(thesis.ThesisProgress.professorReminder) }</p>
                    </div>
                    <div className="field">
                      { this.renderReminderButton(ethesis, evalGraders, "eval") }
                    </div>
                  </div>
                </div>
                <div className="three fields">
                  <h4 className="ui dividing header">Print</h4>
                  <div className="field">
                    { docReady }
                  </div>
                  <div className="field">
                    <button className="ui blue tiny button">Print documents</button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    );
  }

  /**
  * The inital render method. renderContent() is called from here. This method also
  * checks that the state has been updated with the appropriate data before rendering
  * is started.
  */
  render() {
    const isUndefined = typeof this.state.thesis === "undefined" || this.state.thesis === "";
    return (
      <div>
        {
          isUndefined ?
            <p>No thesis found with this id.</p>
            :
            this.renderContent()
        }
      </div>
    );
  }
}
import { connect } from "react-redux";

/**
* A special funciton used to define what the form of the data is that is gotten from the state.
* @return (Object) {user, theses} An object containing a list of all the thesis visible to
* your role and a list of all the users.
*/
const mapStateToProps = (state) => {
  const user = state.get("auth");
  const thesis = state.get("thesis");
  return {
    user: user.get("user").toJS(),
    theses: thesis.get("theses").toJS(),
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
