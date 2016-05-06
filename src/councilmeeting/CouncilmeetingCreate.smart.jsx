/**
* CouncilmeetingCreate.smart for displaying and running the feature for adding
* councilmeeting dates to the database. It contains the CouncilmeetingCreate component
* for creating the visual side of the page and listening for user inpt, and the
* container containing functions for connecting the component to the reducers
* that handle the actual changes to the state.
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { addCouncilmeeting } from "./councilmeeting.actions";
const DatePicker = require("react-datepicker");
const moment = require("moment");

export class CouncilmeetingCreate extends Component {
  constructor() {
    super();
    this.state = {
      date: moment(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
  * Handler method to handle changes happening in the date selection field in the render method.
  * @param date Used to get a hold of what the input of the user was.
  */
  handleChange(date) {
    this.setState({
      date,
    });
  }

  /**
  * Handler method to handle what to do when the submit button is clicked.
  * @param event Used to get a hold of what the input of the user was.
  */
  handleSubmit(event) {
    event.preventDefault();
    const { addCouncilmeeting } = this.props;
    const newCouncilmeeting = {
      date: this.state.date.toDate(),
    };
    addCouncilmeeting(newCouncilmeeting);
  }

  /**
  * The method in charge of rendering the outlook of the page. Contains all the html elements.
  * Contains a react-datepicker library styled date picker.
  * @return <div>-container Container wrapping all the html elements to be rendered.
  */
  render() {
    return (
      <div>
        <h2>Create new councilmeeting date</h2>
        <DatePicker
          dateFormat="DD/MM/YYYY"
          selected={this.state.date}
          onChange={this.handleChange}
        />
        <button className="ui primary button" onClick={this.handleSubmit}>Submit</button>
      </div>
      );
  }
}

/**
* A special function used to define and dispatch the relevant data to councilmeeting.actions
*/
const mapDispatchToProps = (dispatch) => ({
  addCouncilmeeting(newCouncilmeeting) {
    dispatch(addCouncilmeeting(newCouncilmeeting));
  },
});

export default connect(null, mapDispatchToProps)(CouncilmeetingCreate);
