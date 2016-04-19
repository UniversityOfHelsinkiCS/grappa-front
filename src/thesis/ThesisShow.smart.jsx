import React, { Component } from "react";
import { getTheses } from "./thesis.actions";
import { getThesisProgress } from "../thesisprogress/thesisprogress.actions";

export class ThesisShow extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleGrEval = this.handleGrEval.bind(this);
    this.handleEthesisBox = this.handleEthesisBox.bind(this);
    this.handleDocSentBox = this.handleDocSentBox.bind(this);
  }

  componentDidMount() {
    const { getTheses } = this.props;
    const { getThesisProgress } = this.props;
    getTheses();
    getThesisProgress();
  }

  handleEdit() {
    document.getElementsByTagName("textarea")[1].removeAttribute("readOnly");
  }

  handleSave() {
    document.getElementsByTagName("textarea")[1].readOnly = true;
  }

  handleEthesisBox(){
    console.log(document);
    document.getElementById("ebox").checked = true;
  }

  handleGrEval(){
    document.getElementById("grbox").checked = true;
  }

  handleDocSentBox() {
    document.getElementById("docbox").checked = true;
  }

  render() {
    // console.log(this.props.params.id);
    const { theses } = this.props;
    const { thesis } = this.props;
    const { thesisprogress } = this.props;
    let { ethesisBox } = "false";
    let { grEvalBox } = "false";
    let { docBox } = "false";
    const thesisID = 1;
    let thesisprog;
    let rightThesis;
    for(var i=0;i<theses.length;i++){
      if(parseInt(theses[i].id) === parseInt(thesisID)) {
        rightThesis = theses[i];
      }
    }
    for(var i=0;i<thesisprogress.length;i++){
       if(parseInt(thesisprogress[i].thesisId) === parseInt(thesisID)) {
         thesisprog = thesisprogress[i];
       }
    }

    if(typeof rightThesis != "undefined" && typeof thesisprog != "undefined") {
      console.log("inside")
      console.log(rightThesis);
      console.log(thesisprog);
      // if(typeof rightThesis.ethesis !== null && typeof rightThesis.ethesis !== undefined) {
      //   // this.handleEthesisBox();
      //   ethesisBox = "true";
      // }
      // if(thesisprog.gradersStatus === true){
      //   console.log("but not here?");
      //   // this.handleGrEval();
      //   grEvalBox = "true";
      // // }
      // if(typeof thesisprog.documentsSent !== undefined && typeof thesisprog == Date) {
      //   // this.handleDocSentBox();
      //    docBox = "true";
      // }
    }
    return (
      <div>
        <h3 className="ui dividing header">{thesis.title}</h3>
        <div>
          <form className="ui form">
            <div className="field">
              <div>{thesis.author}</div>
              <div>Esimerkki</div>
              <div>{thesis.grade}</div>
            </div>
            <div className="field">
              <div className="field">{ thesis.ethesis }</div>
            </div>
            <div className="field">{ thesis.urkund }</div>
            <h4 className="ui dividing header">Abstract</h4>
            <textarea className="abstract" readOnly rows="5" cols="30" />
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
              <div>
                <input type="checkbox" disabled checked={ethesisBox} id="ebox" />
                <label>E-thesis</label>
              </div>
            </div>
            <div className="field">
              <p>{thesisprog.ethesisReminder}</p>
            </div>
            <div className="field">
              <button className="ui blue tiny button">Send notification</button>
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              <div>
                <input type="checkbox" disabled checked={grEvalBox} id="grbox"/>
                <label>Grader Evaluation</label>
              </div>
            </div>
            <div className="field">
              <p>{thesisprog.professorReminder}</p>
            </div>
            <div className="field">
              <button className="ui blue tiny button">Send notification</button>
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              <div>
                <input type="checkbox" disabled checked={docBox} id="docbox"/>
                <label>Documents sent</label>
              </div>
            </div>
            <div className="field">
              <p>{thesisprog.documentSent}</p>
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
}
import { connect } from "react-redux";

/*
* A special funciton used to define what the form of the data is that is gotten from the state.
* @return ListOfThesis A list containing all the thesis listed in the database.
*/
const mapStateToProps = (state) => {
  const thesisprogress = state.get("thesisprogress");
  const theses = state.get("theses");
  return {
    theses: theses.get("theseslist").toJS(),
    thesis: theses.get("theseslist").toJS()[0],
    thesisprogress: thesisprogress.get("thesesprogresslist").toJS(),
  };
};

/*
* A special function used to define and dispatch the relevant data to thesis.actions
*/
const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
  getThesisProgress() {
    dispatch(getThesisProgress());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(ThesisShow);
