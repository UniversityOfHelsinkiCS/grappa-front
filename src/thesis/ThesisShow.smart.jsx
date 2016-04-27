import React, { Component } from "react";
// import { getTheses } from "./thesis.actions";

export class ThesisShow extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      thesis: {},
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

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleEdit() {
    document.getElementsByTagName("textarea")[1].removeAttribute("readOnly");
    for (let i = 0; i < 5; i++) {
      document.getElementsByTagName("input")[i].removeAttribute("readOnly");
    }
  }

  handleSave() {
    document.getElementsByTagName("textarea")[1].readOnly = true;
    for (let i = 0; i < 5; i++) {
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
                  <div>{ grader.name }</div>
                  <div>{ grader.title }</div>
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
              <input type="text" readOnly value={thesis.title} />
              <div>Name:</div>
              <input type="text" readOnly value={ thesis.author } />
              <div>Grade:</div>
              <input type="text" readOnly value={ thesis.grade } />
            </div>
            <div className="field">
              <div>Ethesis link:</div>
              <input type="text" readOnly value={ thesis.ethesis } />
            </div>
            <div className="field">
              <div>Urkund link:</div>
              <input type="text" readOnly value={ thesis.urkund } />
            </div>
            <h4 className="ui dividing header">Abstract</h4>
            <textarea className="abstract" value={ thesis.abstract } readOnly rows="5" cols="30" />
            { this.renderGraders() }
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
    console.log(this.state.thesis);
    const isUndefined = typeof this.state.thesis === "undefined" || this.state.thesis === "";
    return (
      <div>
        { isUndefined ?
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

export default connect(mapStateToProps, null)(ThesisShow);
