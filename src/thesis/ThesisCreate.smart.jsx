/*
* ThesisCreate.smart for displaying and running the feature for adding thesis,
* which contains the ThesisCreate component for creating the visual side
* of the page and the container containing functions for connecting the component
* to the reducers that handle the actual changes to the state.
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "../ui/Dropdown.component";
import { getCouncilmeetings } from "../councilmeeting/councilmeeting.actions";

export class ThesisCreate extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      title: "",
      grader: "",
      grader2: "",
      graderemail: "",
      grader2email: "",
      gradertitle: "",
      grader2title: "",
      urkund: "",
      ethesis: "",
      abstract: "",
      field: "",
      grade: "",
      deadline: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
/*
* Defines what is done at the beginning of the components life before rendering.
*/
  componentDidMount() {
//    const { listCouncilmeetings } = this.props;
    getCouncilmeetings();
  }
/*
* Handler method to handle changes happening in the different input fields in the render method.
* @param name The id for where the change has happened. Used to designated which state parameter changes.
* @param event Used to get a hold of what the input of the user was.
*/
  handleChange(name, event) {
    const change = {};
    event.preventDefault();
    change[name] = event.target.value;
    this.setState(change);
  }
/*
* Handler method to handle changes happening in the choose date input field in the render method.
* @param event Used to get a hold of what the input of the user was.
*/
  handleDateChange(event) {
    event.preventDefault();
    this.setState({ deadline: event.target.value });
  }
/*
* Handler method to handle what to do when the submit button is clicked.
* @param event Used to get a hold of what the input of the user was.
*/
  handleSubmit(event) {
    event.preventDefault();
    const newThesis = {
      author: `${this.state.fname} ${this.state.lname}`,
      email: this.state.email,
      title: this.state.title,
      grader: this.state.grader,
      grader2: this.state.grader2,
      graderemail: this.state.graderemail,
      grader2email: this.state.grader2email,
      gradertitle: this.state.gradertitle,
      grader2title: this.state.grader2title,
      urkund: this.state.urkund,
      ethesis: this.state.ethesis,
      abstract: this.state.abstract,
      field: this.state.field,
      grade: this.state.grade,
      deadline: this.state.deadline,
    };
    const { saveThesis } = this.props;
    saveThesis(newThesis);
  }
/*
* The method in charge of rendering the outlook of the page. Contains all the html elements.
* @return <div> thesis-container Container wrapping all the html elements to be rendered.
*/
  render() {
    const { dates } = this.props;
    return (
      <div className="thesis-container">
        <form className="ui form">
          <h4 className="ui dividing header">Made by</h4>
          <div className="two fields">
            <div className="field">
              <input type="text" name="madeby[first-name]" value={this.state.fname} onChange={this.handleChange.bind(this, "fname")} placeholder="First Name"/>
            </div>
            <div className="field">
              <input type="text" name="madeby[last-name]" value={this.state.lname} onChange={this.handleChange.bind(this, "lname")} placeholder="Last Name"/>
            </div>
          </div>
          <div className="ten wide field">
            <input type="text" name="madeby[email]" value={this.state.email} onChange={this.handleChange.bind(this, "email")} placeholder="Email Address"/>
          </div>

          <h4 className="ui dividing header">Thesis Information</h4>
          <div className="three fields">
            <div className="field">
              <input type="text" name="thesis[title]" value={this.state.title} onChange={this.handleChange.bind(this, "title")} placeholder="Title"/>
            </div>
            <div className="three wide field">
              <div className="field">
                <select className="ui fluid search dropdown" value={this.state.field} onChange={this.handleChange.bind(this, "field")} name="thesis[field]">
                  <option value="">Field</option>
                  <option value="Bio">Algorithmic Bioinformatics</option>
                  <option value="Alg">Algorithms, Data Analytics and Machine Learning</option>
                  <option value="Net">Networking and Services</option>
                  <option value="Soft">Software Systems</option>
                </select>
              </div>
            </div>
            <div className="five wide field">
              <select className="ui fluid search dropdown" value={this.state.grade} onChange={this.handleChange.bind(this, "grade")} name="thesis[grade]">
                <option value="">Grade</option>
                <option value="A">Approbatur</option>
                <option value="B">Lubenter Approbatur</option>
                <option value="X">Non Sine Laude Approbatur</option>
                <option value="C">Cum Laude Approbatur</option>
                <option value="M">Magna Cum Laude Approbatur</option>
                <option value="E">Eximia Cum Laude Approbatur</option>
                <option value="L">Laudatur</option>
              </select>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <input type="text" name="thesis[ethesis]" value={this.state.ethesis} onChange={this.handleChange.bind(this, "ethesis")} placeholder="Link to E-thesis"/>
            </div>
            <div className="field">
              <input type="text" name="thesis[urkund]" value={this.state.urkund} onChange={this.handleChange.bind(this, "urkund")} placeholder="Link to Urkund"/>
            </div>
          </div>
          <h4 className="ui dividing header">Graders</h4>
          <div className="three fields">
            <div className="field">
              <input type="text" name="1grader[name]" value={this.state.grader} onChange={this.handleChange.bind(this, "grader")} placeholder="Name"/>
            </div>
            <div className="four wide field">
              <div className="field">
                <select className="ui fluid search dropdown" value={this.state.gradertitle} onChange={this.handleChange.bind(this, "gradertitle")} name="1grader[field]">
                  <option value="">Rank</option>
                  <option value="AssProf">Assistant Professor</option>
                  <option value="AdjProf">Adjunct Professor</option>
                  <option value="Prof">Professor</option>
                  <option value="Doc">Doctor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="field">
              <input type="text" name="1grader[email]" value={this.state.graderemail} onChange={this.handleChange.bind(this, "graderemail")} placeholder="Email"/>
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              <input type="text" name="2grader[name]" value={this.state.grader2} onChange={this.handleChange.bind(this, "grader2")}placeholder="Name"/>
            </div>
            <div className="four wide field">
              <select className="ui fluid search dropdown" value={this.state.grader2title} onChange={this.handleChange.bind(this, "grader2title")} name="2grader[field]">
                <option value="">Rank</option>
                <option value="AdjProf">Adjunct Professor</option>
                <option value="Prof">Professor</option>
                <option value="Doc">Doctor</option>
              </select>
            </div>
            <div className="field">
              <input type="text" name="2grader[email]" value={this.state.grader2email} onChange={this.handleChange.bind(this, "grader2email")} placeholder="Email"/>
            </div>
          </div>
          <button className="ui primary button">Add Graders</button>
          <h4 className="ui dividing header">Choose the date for the Department Council meeting</h4>
          <Dropdown data={dates} onChange={this.handleDateChange}/>
        </form>
        <button className="ui primary button" onClick={this.handleSubmit}>Submit</button>
        <button className="ui primary button">Cancel</button>
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
  const reducer = state.get("councilmeetings");
  return {
    dates: reducer.get("councilmeetinglist").toJS(),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ThesisCreate);
