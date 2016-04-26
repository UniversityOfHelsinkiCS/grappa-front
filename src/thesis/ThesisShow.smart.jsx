import React, { Component } from "react";
// import { getTheses } from "./thesis.actions";
import { getThesisProgress } from "../thesisprogress/thesisprogress.actions";

export class ThesisShow extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      thesis: "",
    };
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

  componentWillMount() {
    this.findThesisFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.findThesisFromProps(newProps);
  }

  handleEdit() {
    document.getElementsByTagName("textarea")[1].removeAttribute("readOnly");
  }

  handleSave() {
    document.getElementsByTagName("textarea")[1].readOnly = true;
  }

  renderContent() {
    const thesis = this.state.thesis;
        console.log(thesis);
    return (
      <div>
        <h3 className="ui dividing header">{ thesis.title }</h3>
        <div>
          <form className="ui form">
            <div className="field">
              <div>{ thesis.author }</div>
              <div>Lol</div>
              <div>{ thesis.grade }</div>
            </div>
            <div className="field">
              <div className="field">{ thesis.ethesis }</div>
            </div>
            <div className="field">{ thesis.urkund }</div>
            <h4 className="ui dividing header">Abstract</h4>
            <textarea className="abstract" value={ thesis.abstract } readOnly rows="5" cols="30" />
            <div className="field">
              <h4 className="ui dividing header">Graders</h4>
              <div className="field">
                <div>Simo Häyhä</div>
                <div>PhD</div>
              </div>
              <div className="field">
                <div>Jari Kurri</div>
                <div>PROFESSOR</div>
              </div>
            </div>
            <h4 className="ui dividing header">Grader Evaluation</h4>
            <textarea className="eval" readOnly rows="5" cols="30" />
          </form>
        </div>
        <form className="ui form">
          <h4 className="ui dividing header">Notifications</h4>
          <div className="three fields">
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" />
                <label>E-thesis</label>
              </div>
            </div>
            <div className="field">
              <p>"latest notification sent, date"</p>
            </div>
            <div className="field">
              <button className="ui blue tiny button">Send notification</button>
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" />
                <label>Reports</label>
              </div>
            </div>
            <div className="field">
              <p>"latest notification sent, date"</p>
            </div>
            <div className="field">
              <button className="ui blue tiny button">Send notification</button>
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" />
                <label>Documents sent</label>
              </div>
            </div>
            <div className="field">
              <p>"date when sent"</p>
            </div>
            <div className="field">
              <button className="ui blue tiny button">Resend</button>
            </div>
          </div>
        </form>
        <h3 id="deadlineReminder">Deadline: {thesis.deadline}</h3>
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

export default connect(mapStateToProps, null)(ThesisShow);
