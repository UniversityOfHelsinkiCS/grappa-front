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
import { getCouncilmeetings } from "../councilmeeting/councilmeeting.actions";


export class ThesisCreate extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      title: "",
      grader: "",
      grader2: "",
      gradertitle: "",
      grader2title: "",
      urkund: "",
      ethesis: "",
      field: "",
      grade: "",
      deadline: "",
    };
  }
/*
* Defines what is done at the beginning of the components life before rendering.
*/
  componentDidMount() {
    const { getCouncilmeetings } = this.props;
    getCouncilmeetings();
  }
/*
* Handler method to handle changes happening in the different input fields in the render method.
* @param name The id for where the change has happened. Used to designated which state parameter changes.
* @param event Used to get a hold of what the input of the user was.
* @param type Type of validation needed: text, email or link
*/
  handleChange(name, event) {
    event.preventDefault();
    const change = {};
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
      graders: [this.state.grader, this.state.gradertitle, this.state.grader2, this.state.grader2title],
      urkund: this.state.urkund,
      ethesis: this.state.ethesis,
      field: this.state.field,
      grade: this.state.grade,
      deadline: this.state.deadline,
    };
    console.log(newThesis);
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
      <Validation.Form className="ui form" onSubmit={this.handleSubmit}>
        <h4 className="ui dividing header">Made by</h4>
        <div className="two fields">
          <div className="field">
            <Validation.Input
              type="text"
              name="madeby[first-name]"
              value={this.state.fname}
              onChange={this.handleChange.bind(this, "fname")}
              placeholder="First Name"
              validations={[{ rule: "isRequired" },
                            { rule: "isAlpha" }]}
            />
          </div>
          <div className="field">
            <Validation.Input
              type="text"
              name="madeby[last-name]"
              value={this.state.lname}
              onChange={this.handleChange.bind(this, "lname")}
              placeholder="Last Name"
              validations={[{ rule: "isRequired" },
                            { rule: "isAlpha" }]}
            />
          </div>
        </div>
        <div className="ten wide field">
          <Validation.Input
            type="text"
            name="madeby[email]"
            value={this.state.email} onChange={this.handleChange.bind(this, "email")} placeholder="Email Address"
            validations={[{ rule: "isRequired" },
                          { rule: "isEmail" }]}
          />
        </div>

        <h4 className="ui dividing header">Thesis Information</h4>
        <div className="three fields">
          <div className="field">
            <Validation.Input
              type="text"
              name="thesis[title]"
              value={this.state.title}
              onChange={this.handleChange.bind(this, "title")}
              placeholder="Title"
              validations={[{ rule: "isRequired" }]}
            />
          </div>
          <div className="three wide field">
            <div className="field">
              <Validation.Select
                className="ui fluid search dropdown"
                value={this.state.field}
                onChange={this.handleChange.bind(this, "field")}
                name="thesis[field]"
              >
                <option value="">Field</option>
                <option value="Bio">Algorithmic Bioinformatics</option>
                <option value="Alg">Algorithms, Data Analytics and Machine Learning</option>
                <option value="Net">Networking and Services</option>
                <option value="Soft">Software Systems</option>
              </Validation.Select>
            </div>
          </div>
          <div className="five wide field">
            <Validation.Select
              className="ui fluid search dropdown"
              value={this.state.grade}
              onChange={this.handleChange.bind(this, "grade")}
              name="thesis[grade]"
            >
              <option value="">Grade</option>
              <option value="A">Approbatur</option>
              <option value="B">Lubenter Approbatur</option>
              <option value="X">Non Sine Laude Approbatur</option>
              <option value="C">Cum Laude Approbatur</option>
              <option value="M">Magna Cum Laude Approbatur</option>
              <option value="E">Eximia Cum Laude Approbatur</option>
              <option value="L">Laudatur</option>
            </Validation.Select>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <Validation.Input
              type="text"
              name="thesis[ethesis]"
              value={this.state.ethesis}
              onChange={this.handleChange.bind(this, "ethesis")}
              placeholder="Link to E-thesis"
              validations={[{ rule: "isLink" }]}
            />
          </div>
          <div className="field">
            <Validation.Input
              type="text"
              name="thesis[urkund]"
              value={this.state.urkund}
              onChange={this.handleChange.bind(this, "urkund")}
              placeholder="Link to Urkund"
              validations={[{ rule: "isRequired" },
                            { rule: "isLink" }]}
            />
          </div>
        </div>
        <h4 className="ui dividing header">Graders</h4>
        <div className="three fields">
          <div className="field">
            <Validation.Input type="text" name="1grader[name]" value={this.state.grader} onChange={this.handleChange.bind(this, "grader")} placeholder="Name"/>
          </div>
          <div className="four wide field">
            <div className="field">
              <Validation.Select className="ui fluid search dropdown" value={this.state.gradertitle} onChange={this.handleChange.bind(this, "gradertitle")} name="1grader[field]">
                <option value="">Rank</option>
                <option value="AssProf">Assistant Professor</option>
                <option value="AdjProf">Adjunct Professor</option>
                <option value="Prof">Professor</option>
                <option value="Doc">Doctor</option>
                <option value="Other">Other</option>
              </Validation.Select>
            </div>
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <Validation.Input
              type="text"
              name="2grader[name]"
              value={this.state.grader2}
              onChange={this.handleChange.bind(this, "grader2")}
              placeholder="Name"
              validations={[{ rule: "isRequired" }]}
            />
          </div>
          <div className="four wide field">
            <Validation.Select
              className="ui fluid search dropdown"
              value={this.state.grader2title}
              onChange={this.handleChange.bind(this, "grader2title")}
              name="2grader[field]"
              validations={[{ rule: "isRequired" }]}
            >
              <option value="">Rank</option>
              <option value="AdjProf">Adjunct Professor</option>
              <option value="Prof">Professor</option>
              <option value="Doc">Doctor</option>
            </Validation.Select>
          </div>
        </div>
        <button className="ui primary button">Add Graders</button>
        <h4 className="ui dividing header">Choose the date for the Department Council meeting</h4>
        <Dropdown data={dates} onChange={this.handleDateChange}/>
        <Validation.Button className="ui primary button" value="Submit" onClick={this.handleSubmit}/>
        <button className="ui primary button">Cancel</button>
      </Validation.Form>
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
