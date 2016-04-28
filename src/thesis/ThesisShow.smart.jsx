import React, { Component } from "react";
import { updateThesis } from "./thesis.actions";
import { updateGrader } from "../grader/grader.actions";
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
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleGrNameChange = this.handleGrNameChange.bind(this);
    this.handleGrTitleChange = this.handleGrTitleChange.bind(this);
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

  handleReviewChange(event){
    event.preventDefault();
    this.setState({ review: event.target.value });
  }
  handleTitleChange(event) {
    const thesispointer = this.state.thesis;
    thesispointer.title = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }
  handleNameChange(event) {
    const thesispointer = this.state.thesis;
    thesispointer.author = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }
  handleGradeChange(event) {
    const thesispointer = this.state.thesis;
    thesispointer.grade = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }
  handleEthesisChange(event) {
    const thesispointer = this.state.thesis;
    thesispointer.ethesis = event.target.value;
    this.setState({ thesis: this.state.thesis });
  }
  handleUrkundChange(event, id) {
    const thesispointer = this.state.thesis;
    thesispointer.urkund = event.target.value;
    this.setState({ thesis: this.state.thesis });
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
  handleEdit() {
    document.getElementsByTagName("textarea")[1].removeAttribute("readOnly");
    for (let i = 0; i < 9; i++) {
      document.getElementsByTagName("input")[i].removeAttribute("readOnly");
    }
  }
  handleSave() {
    this.props.updateThesis(this.state.thesis);

    const graders = this.state.thesis.Graders;
    for(let i=0; i< graders.length; i++){
      this.props.updateGrader(graders[i]);
    }

    document.getElementsByTagName("textarea")[1].readOnly = true;
    for (let i = 0; i < 9; i++) {
      document.getElementsByTagName("input")[i].readOnly = true;
    }
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
                  <input type="text" readOnly value={grader.name} onChange={ this.handleGrNameChange.bind(this, graders.indexOf(grader)) } />
                  <input type="text" readOnly value={grader.title} onChange={ this.handleGrTitleChange.bind(this, graders.indexOf(grader)) } />
                </div>
              )
            }
          </div>
        }
      </div>
    );
  }

  renderContent() {
    const thesis = this.state.thesis;
    let ethesis = "Missing";
    let evalGraders = "Not Done";
    let docSent = "Not Sent";

    if (thesis.ethesis !== "" && thesis.ethesis !== null) {
      ethesis = "Added";
    }
    if (thesis.ThesisProgress !== null && thesis.ThesisProgress !== undefined && thesis.ThesisProgress.gradersStatus) {
      evalGraders = "Done";
    }
    if (thesis.ThesisProgress !== null && thesis.ThesisProgress.documentsSent !== null && thesis.ThesisProgress.documentsSent !== "") {
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
            <textarea className="abstract" readOnly value={ thesis.abstract } rows="5" cols="30" />
            <div className="field">
              { this.renderGraders() }
            </div>
            <h4 className="ui dividing header">Grader Evaluation</h4>
            <textarea className="eval" readOnly value={ this.state.review } onChange={ this.handleReviewChange.bind(this) } rows="5" cols="30" />
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
  updateGrader(grader) {
    dispatch(updateGrader(grader));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisShow);
