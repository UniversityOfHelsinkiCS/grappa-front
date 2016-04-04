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

  handleChange(date) {
    this.setState({
      date,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { addCouncilmeeting } = this.props;
    const newCouncilmeeting = {
      date: this.state.date,
    };
    console.log(newCouncilmeeting);
    addCouncilmeeting(newCouncilmeeting);
  }


  render() {
    return (
      <div>
        <h2>Add a new date for a councilmeeting</h2>
        <DatePicker
          dateFormat="DD/MM/YYYY"
          selected={this.state.date}
          onChange={this.handleChange}
        />
        <button className="ui primary button" onClick={this.handleSubmit}>Submit</button>
        <button className="ui primary button">Cancel</button>
      </div>

      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCouncilmeeting(newCouncilmeeting) {
    dispatch(addCouncilmeeting(newCouncilmeeting));
  },
});

export default connect(null, mapDispatchToProps)(CouncilmeetingCreate);
