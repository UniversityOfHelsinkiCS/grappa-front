import React, { Component } from "react";
import { connect } from "react-redux";

import { addThesis } from "../thesis/Thesis.actions";

export class ThesisCreate extends Component {

  constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getInitialState = this.getInitialState.bind(this);
  }

  getInitialState() {
     return {value: "asdf"};
   }

handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const newThesis = {
      id: this.props.id + 1,
      author: fname,
      email: email,
      title: title,
      instructor: instructor,
      urkund: urkund,
      ethesis: ethesis,
      abstract: abstract,
      field: field,
      grade: grade,
      deadline: "10.10.2010",
    };
    addThesis(newThesis);
  }

  render() {
    let fname = "asd";
    let lname = "";
    let email = "";
    let title = "";
    let instructor = "";
    let urkund = "";
    let ethesis = "";
    let abstract = "";
    let field = "";
    let grade = "";
    let deadline = "";

    return (
      <div>
        <body>
          <header>
            <h1 id="sign">Sign in as USER</h1>
            <div id="nav" className="ui vertical pointing menu">
              <a className="item">Home</a>
              <a className="item active">Add new thesis</a>
              <a className="item">View all theses</a>
            </div>
          </header>
          <main id="app" className="main-container">
            <form className="ui form">
              <h4 className="ui dividing header">Made by</h4>
              <div className="field">
                <div className="two fields">
                  <div className="field">
                    <input type="text" name="madeby[first-name]" value={this.state.value} onChange={this.handleChange} placeholder="First Name"/>
                  </div>
                  <div className="field">
                    <input type="text" name="madeby[last-name]" value={lname} placeholder="Last Name"/>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="ten wide field">
                  <input type="text" name="madeby[email]" value={email} placeholder="Email Address"/>
                </div>
              </div>
              <h4 className="ui dividing header">Thesis Information</h4>
              <div className="field">
                <div className="three fields">
                  <div className="field">
                    <input type="text" name="thesis[title]" value={title} placeholder="Title"/>
                  </div>
                  <div className="three wide field">
                    <div className="field">
                      <select className="ui fluid search dropdown" name="thesis[field]">
                        <option value="">Field</option>
                        <option value="1">Algorithmic Bioinformatics</option>
                        <option value="2">Algorithms, Data Analytics and Machine Learning</option>
                        <option value="3">Networking and Services</option>
                        <option value="4">Software Systems</option>
                      </select>
                    </div>
                  </div>
                  <div className="five wide field">
                    <div className="field">
                      <select className="ui fluid search dropdown" name="thesis[grade]">
                        <option value="">Grade</option>
                        <option value="1">Approbatur</option>
                        <option value="2">Lubenter Approbatur</option>
                        <option value="3">Non Sine Laude Approbatur</option>
                        <option value="4">Cum Laude Approbatur</option>
                        <option value="5">Magna Cum Laude Approbatur</option>
                        <option value="6">Eximia Cum Laude Approbatur</option>
                        <option value="7">Laudatur</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <input type="text" name="thesis[ethesis]" value={ethesis} placeholder="Link to E-thesis"/>
                </div>
                <div className="field">
                  <input type="text" name="thesis[urkund]" value={urkund} placeholder="Link to Urkund"/>
                </div>
              </div>
              <h4 className="ui dividing header">Instructors</h4>
              <div className="field">
                <div className="three fields">
                  <div className="field">
                    <input type="text" name="1instructor[name]" value={instructor} placeholder="Name"/>
                  </div>
                  <div className="four wide field">
                    <div className="field">
                      <select className="ui fluid search dropdown" name="1instructor[field]">
                        <option value="">Rank</option>
                        <option value="1">Adjunct Professor</option>
                        <option value="2">Professor</option>
                        <option value="3">Doctor</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <input type="text" name="1instructor[email]" placeholder="Email"/>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="three fields">
                  <div className="field">
                    <input type="text" name="2instructor[name]" placeholder="Name"/>
                  </div>
                  <div className="four wide field">
                    <div className="field">
                      <select className="ui fluid search dropdown" name="2instructor[field]">
                        <option value="">Rank</option>
                        <option value="1">Adjunct Professor</option>
                        <option value="2">Professor</option>
                        <option value="3">Doctor</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <input type="text" name="2instructor[email]" placeholder="Email"/>
                  </div>
                </div>
              </div>
              <button className="ui primary button">Add instructors</button>
              <h4 className="ui dividing header">Choose the date for the Department
              Council meeting</h4>
            </form>
            <button className="ui primary button" onClick={this.handleSubmit}>Submit</button>
            <button className="ui primary button">Cancel</button>
          </main>
        </body>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addThesis(newThesis) {
    dispatch(addThesis(newThesis));
  },
});

export default connect(null, mapDispatchToProps)(ThesisCreate);
