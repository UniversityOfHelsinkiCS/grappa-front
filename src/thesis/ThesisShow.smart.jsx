import React, { Component } from "react";
var update = require("react-addons-update");
import { updateThesis } from "./thesis.actions";
// import { getTheses } from "./thesis.actions";

export class ThesisShow extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleEthesisChange = this.handleEthesisChange.bind(this);
    this.handleUrkundChange = this.handleUrkundChange.bind(this);
    this.state = {
      thesis: "",
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

  handleTitleChange(event) {
    let lol = this.state.thesis;
    lol.title = event.target.value;
    this.setState({ thesis: this.state.thesis});
  }
  handleNameChange(event) {
    let loli = this.state.thesis;
    loli.author = event.target.value;
    this.setState({ thesis: this.state.thesis});
  }
  handleGradeChange(event) {
    let lolt = this.state.thesis;
    lolt.grade = event.target.value;
    this.setState({ thesis: this.state.thesis});
  }
  handleEthesisChange(event) {
    let loly = this.state.thesis;
    loly.ethesis = event.target.value;
    this.setState({ thesis: this.state.thesis});
  }
  handleUrkundChange(event) {
    let lolq = this.state.thesis;
    lolq.urkund = event.target.value;
    this.setState({ thesis: this.state.thesis});
  }
  handleEdit(event) {
    document.getElementsByTagName("textarea")[1].removeAttribute("readOnly");
    for (let i = 0; i < 5; i++) {
      document.getElementsByTagName("input")[i].removeAttribute("readOnly");
    }
  }
  handleSave(event) {
    this.props.updateThesis(this.state.thesis);
    document.getElementsByTagName("textarea")[1].readOnly = true;
    for (let i = 0; i < 5; i++) {
      document.getElementsByTagName("input")[i].readOnly = true;
    }
  }

  renderContent() {
    const thesis = this.state.thesis;
    let ethesis = "Missing";
    let evalGraders = "Not Done";
    let docSent = "Not Sent";
    console.log(thesis);
    if (thesis.ethesis !== "" && thesis.ethesis !== null) {
      ethesis = "Added";
    }
    if (thesis.ThesisProgress.gradersStatus) {
      evalGraders = "Done";
    }
    if (thesis.ThesisProgress.documentsSent !== null && thesis.ThesisProgress.documentsSent !== "") {
      docSent = "Sent";
    }
    return (
      <div>
        <div>
          <form className="ui form">
            <div className="field">
              <div>Title:</div>
              <input type="text" readOnly value={thesis.title} onChange={ this.handleTitleChange.bind(this) } />
              <div>Name:</div>
              <input type="text" readOnly value={ thesis.author } onChange={ this.handleNameChange.bind(this) } />
              <div>Grade:</div>
              <input type="text" readOnly value={ thesis.grade } onChange={ this.handleGradeChange.bind(this) } />
            </div>
            <div className="field">
              <div>Ethesis link:</div>
              <input type="text" readOnly value={ thesis.ethesis } onChange={ this.handleEthesisChange.bind(this) } />
            </div>
            <div className="field">
              <div>Urkund link:</div>
              <input type="text" readOnly value={ thesis.urkund } onChange={ this.handleUrkundChange.bind(this) } />
            </div>
            <h4 className="ui dividing header">Abstract</h4>
            <textarea className="abstract" value={ thesis.abstract } readOnly rows="5" cols="30" />
            <div className="field">
              <h4 className="ui dividing header">Graders</h4>
              <div className="field">
                <h5>Grader 1</h5>
                <div>Grader name: { thesis.Graders[0].name }</div>
                <div>Grader title: { thesis.Graders[0].title }</div>
              </div>
              <div className="field">
                <h5>Grader 2</h5>
                <div>Grader name: { thesis.Graders[1].name }</div>
                <div>Grader title: { thesis.Graders[1].title }</div>
              </div>
            </div>
            <h4 className="ui dividing header">Grader Evaluation</h4>
            <textarea className="eval" readOnly rows="5" cols="30" />
          </form>
        </div>
        <form className="ui form">
          <h4 className="ui dividing header">Notifications</h4>
          <div className="three fields">
            <div className="field">Name and status</div>
            <div className="field">Date when last notification sent</div>
            <div className="field">Buttons for sending notifications</div>
          </div>
          <div className="three fields">
            <div className="field">
              Ethesis Link
              <div className="ui tag label"> { ethesis } </div>
            </div>
            <div className="field">
              <p>{ thesis.ThesisProgress.ethesisReminder }</p>
            </div>
            <div className="field">
              <button className="ui blue tiny button">Send notification</button>
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              Grader Evaluation
              <div className="ui tag label"> { evalGraders } </div>
            </div>
            <div className="field">
              <p>{ thesis.ThesisProgress.professorReminder }</p>
            </div>
            <div className="field">
              <button className="ui blue tiny button">Send notification</button>
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              Documents
              <div className="ui tag label"> { docSent } </div>
            </div>
            <div className="field">
              <p>{ thesis.ThesisProgress.documentsSent }</p>
            </div>
            <div className="field">
              <button className="ui blue tiny button">Resend</button>
            </div>
          </div>
        </form>
        <h3 id="deadlineReminder">Deadline: { thesis.deadline }</h3>
        <button className="ui primary button" id="editButton" onClick={ this.handleEdit }>Edit</button>
        <button className="ui primary button" id="saveButton" onClick={ this.handleSave }>Save</button>
      </div>
    );
  }
  render() {
    // console.log("state is ")
    // console.log(this.state);
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
  const thesis = state.get("thesis");
  return {
    theses: thesis.get("theses").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateThesis(thesis) {
    dispatch(updateThesis(thesis));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisShow);
