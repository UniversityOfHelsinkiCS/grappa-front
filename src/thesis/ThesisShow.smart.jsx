import React, { Component } from "react";
import { updateThesis } from "./thesis.actions";
import { updateGrader } from "../grader/grader.actions";
import { updateUser } from "../user/user.actions";
import { sendNotification } from "../email/email.actions";
// import { getTheses } from "./thesis.actions";

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

    this.state = {
      thesis: {},
      review: "",
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

  handleChange(name, event) {
    const thesispointer = this.state.thesis;
    thesispointer[name] = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }
  handleInstructorChange(event) {
    const thesispointer = this.state.thesis;
    thesispointer.User.name = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }

  handleNotification(name, event) {
    event.preventDefault();
    this.props.sendNotification({ thesis: this.state.thesis, type: name });
  }

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

  handleEval() {
    document.getElementsByTagName("textarea")[1].removeAttribute("readOnly");
  }
  handleSubmit() {
    document.getElementsByTagName("textarea")[1].readOnly = true;
    this.props.updateThesis(this.state.thesis);
  }

  handleEdit() {
    const graders = this.state.thesis.Graders;
    for (let i = 0; i < 6 + (graders.length * 2); i++) {
      document.getElementsByTagName("input")[i].removeAttribute("readOnly");
    }
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

  renderContent() {
    const thesis = this.state.thesis;
    console.log(this.props.user);
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
            <input type="text" readOnly value={ thesis.grade } onChange={ this.handleChange.bind(this, "grade") } />
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

  renderThesisEditButtons() {
    const user = this.props.user;
    if (user.role === "admin" || user.name === this.state.instructor) {
      return (
        <div>
          <button className="ui primary button" id="editButton" onClick={ this.handleEdit }>Edit</button>
          <button className="ui primary button" id="saveButton" onClick={ this.handleSave }>Save</button>
        </div>
      );
    }
    return false;
  }

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

/*
* A special funciton used to define what the form of the data is that is gotten from the state.
* @return ListOfThesis A list containing all the thesis listed in the database.
*/
const mapStateToProps = (state) => {
  const user = state.get("auth");
  const thesis = state.get("thesis");
  return {
    user: user.get("user").toJS(),
    theses: thesis.get("theses").toJS(),
  };
};

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
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisShow);
