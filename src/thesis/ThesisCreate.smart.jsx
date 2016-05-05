/*
* ThesisCreate.smart for displaying and running the feature for adding thesis,
* which contains the ThesisCreate component for creating the visual side
* of the page and the container containing functions for connecting the component
* to the reducers that handle the actual changes to the state.
*/

import React from "react";
import { connect } from "react-redux";
import Dropdown from "../ui/Dropdown.component";
import Validation from "./thesisValidation";
import { validateField, validateModel } from "../config/Validator";
import { getCouncilmeetings } from "../councilmeeting/councilmeeting.actions";

export class ThesisCreate extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      title: "",
      graders: [
        {
          name: "",
          title: "",
        },
        {
          name: "",
          title: "",
        },
      ],
      urkund: "",
      ethesis: "",
      StudyFieldName: "",
      grade: "",
      CouncilMeetingId: "",
      errors: {},
    };
  }
/*
* Defines what is done at the beginning of the components life before rendering.
*/
  componentDidMount() {
    this.props.getCouncilmeetings();
  }

  /**
  * Handler method to handle changes happening in the different input fields in the render method.
  * @param name The id for where the change has happened. Used to designated which state parameter changes.
  * @param event Used to get a hold of what the input of the user was.
  * @param type Type of validation needed: text, email or link
  */
  handleChange(name, event) {
    console.log(name);
    event.preventDefault();
    const change = {
      errors: this.state.errors,
    };
    change[name] = event.target.value;
    console.log(change)
    const newErrors = validateField(name, event.target.value, "thesis");
    console.log(newErrors);
    change.errors[name] = newErrors;
    this.setState(change);
  }

  handleGraderChange(index, name, event) {
    event.preventDefault();
    const change = {
      graders: this.state.graders,
      errors: this.state.errors,
    }
    change.graders[index][name] = event.target.value;
    const newErrors = validateField(name, event.target.value, "grader");
    console.log(newErrors);
    change.errors[name] = newErrors;
    this.setState(change);
  }

  addGrader(event) {
    event.preventDefault();
    const newGrader = {
      name: "",
      title: "",
    };
    this.setState({
      graders: [...this.state.graders, newGrader],
    });
  }

  removeGrader(index, event) {
    event.preventDefault();
    this.state.graders.splice(index, 1);
    this.setState({ graders: this.state.graders });
  }
/**
* Handler method to handle what to do when the submit button is clicked.
* @param event Used to get a hold of what the input of the user was.
*/
  handleSubmit(event) {
    event.preventDefault();
    const thesisErrors = validateModel(this.state, "thesis");
    console.log(thesisErrors);
    if (thesisErrors.list.length === 0) {
      const newThesis = {
        author: `${this.state.fname} ${this.state.lname}`,
        email: this.state.email,
        title: this.state.title,
        graders: this.state.graders,
        urkund: this.state.urkund,
        ethesis: this.state.ethesis,
        StudyFieldName: this.state.StudyFieldName,
        grade: this.state.grade,
        CouncilMeeting: this.props.meetingDates.find(date => {
          if (date.id === parseInt(this.state.CouncilMeetingId), 10) return date;
        }),
      };
      this.props.saveThesis(newThesis);
    } else {
      this.setState({ errors: thesisErrors.obj });
    }
  }

  renderThesisAuthor() {
    return (
      <div className="m-bot">
        <h4 className="ui dividing header">Thesis Author</h4>
        <div className="field">
          <label>First name*</label>
          <input
            type="text"
            name="madeby[first-name]"
            value={this.state.fname}
            onChange={this.handleChange.bind(this, "fname")}
            placeholder="First Name"
          />
        </div>
        <div className="field">
          <label>Last name*</label>
          <input
            type="text"
            name="madeby[last-name]"
            value={this.state.lname}
            onChange={this.handleChange.bind(this, "lname")}
            placeholder="Last Name"
          />
        </div>
        <div className="field">
          <label>Email*</label>
          <input
            type="text"
            name="madeby[email]"
            value={this.state.email}
            onChange={this.handleChange.bind(this, "email")}
            placeholder="Email Address"
          />
        </div>
      </div>
    );
  }

  renderThesisInformation() {
    return (
      <div className="m-bot">
        <h4 className="ui dividing header">Thesis Information</h4>
        <div className="three fields">
          <div className="field">
            <label>Title*</label>
            <input
              type="text"
              name="thesis[title]"
              value={this.state.title}
              onChange={this.handleChange.bind(this, "title")}
              placeholder="Title"
            />
          </div>
          <div className="three wide field">
            <div className="field">
              <label>Studyfield*</label>
              <select
                className="ui fluid search dropdown"
                value={this.state.field}
                onChange={this.handleChange.bind(this, "StudyFieldName")}
                name="thesis[field]"
              >
                <option value="">Select field</option>
                <option value="Algorithmic Bioinformatics">Algorithmic Bioinformatics</option>
                <option value="Algorithms, Data Analytics and Machine Learning">Algorithms, Data Analytics and Machine Learning</option>
                <option value="Networking and Services">Networking and Services</option>
                <option value="Software Systems">Software Systems</option>
              </select>
            </div>
          </div>
          <div className="five wide field">
            <label>Grade*</label>
            <select
              className="ui fluid search dropdown"
              value={this.state.grade}
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
        </div>
        <div className="two fields">
          <div className="field">
            <label>E-thesis-link</label>
            <input
              type="text"
              name="thesis[ethesis]"
              value={this.state.ethesis}
              onChange={this.handleChange.bind(this, "ethesis")}
              placeholder="Link to E-thesis"
            />
          </div>
          <div className="field">
            <label>Urkund-link</label>
            <input
              type="text"
              name="thesis[urkund]"
              value={this.state.urkund}
              onChange={this.handleChange.bind(this, "urkund")}
              placeholder="Link to Urkund"
            />
          </div>
        </div>
      </div>
    );
  }

  renderGraders() {
    return (
      <div className="m-bot">
        <h4 className="ui dividing header">Graders</h4>
        {
          this.state.graders.map((grader, index) =>
            <div key={index} className="two fields">
              <div className="field">
                <label>Name*</label>
                <input type="text" name="grader_name" value={grader.name} onChange={this.handleGraderChange.bind(this, index, "name")} placeholder="Name" />
              </div>
              <div className="field">
                <label>Title*</label>
                <select className="ui fluid search dropdown" value={grader.title} onChange={this.handleGraderChange.bind(this, index, "title")} >
                  <option value="">Select title</option>
                  <option value="Prof">Professor</option>
                  <option value="AssProf">Assistant Professor</option>
                  <option value="AdjProf">Adjunct Professor</option>
                  <option value="Doc">Doctor</option>
                  <option value="Other">Other</option>
                </select>
                <button className="ui red button" onClick={this.removeGrader.bind(this, index)}>Remove Grader</button>
              </div>
            </div>
          )
        }
        <button className="ui primary button" onClick={this.addGrader.bind(this)}>Add Grader</button>
      </div>
    );
  }

  renderPickCouncilmeeting() {
    const meetingDates = [{ id: "", date: "Select Date" }, ...this.props.meetingDates];
    return (
      <div className="m-bot">
        <h4 className="ui dividing header">Choose the date for the Department Council meeting</h4>
        <select className="ui fluid search dropdown" value={this.state.chosenDate} onChange={this.handleChange.bind(this, "CouncilMeetingId")}>
          { meetingDates.map((meeting, index) =>
            <option key={ index } value={ meeting.id } >
              { meeting.date }
              {/*{ this.dateFormatter(date.date) }*/}
            </option>
          )}
        </select>
      </div>
    );
  }

  renderErrorsAndSubmit() {
    const errors = Object.keys(this.state.errors).reduce((previous, key) =>
      [...previous, ...this.state.errors[key]]
    , []);
    const noErrors = errors.length === 0;
    if (errors.length === 0) {
      return (
        <button className="ui primary button" onClick={this.handleSubmit}>
          Submit
        </button>
      );
    }
    console.log("were errors!")
    console.log(errors);
    return (
      <div className="ui error message">
        <ul className="list">
          { errors.map((error, index) => <li key={index}>{error}</li>) }
        </ul>
      </div>
    );
  }
/*
* The method in charge of rendering the outlook of the page. Contains all the html elements.
* @return <div> thesis-container Container wrapping all the html elements to be rendered.
*/
  render() {
    return (
      <div>
        <div className="ui form">
          {this.renderThesisAuthor()}
          {this.renderThesisInformation()}
          {this.renderGraders()}
          {this.renderPickCouncilmeeting()}
        </div>
        {this.renderErrorsAndSubmit()}
      </div>
    );
  }
}

import { saveThesis } from "./thesis.actions";
/*
* A special function used to define and dispatch the relevant data to thesis.actions
*/
const mapDispatchToProps = (dispatch) => ({
  saveThesis(newThesis) {
    dispatch(saveThesis(newThesis));
  },
  getCouncilmeetings() {
    dispatch(getCouncilmeetings());
  },
});
/*
* A special function used to define what the form of the data is that is gotten from the state.
* @return ListOfDateObjects A list containing the dates of councilmeetings listed in the database.
*/
const mapStateToProps = (state) => {
  const cmreducer = state.get("councilmeeting");
  return {
    meetingDates: cmreducer.get("councilmeetings").toJS(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThesisCreate);
