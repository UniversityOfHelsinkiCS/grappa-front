import React, { Component } from "react";
import Validate from "../../validate/Validate";
import ValidateError from "../../ui/Error";

export default class StudyfieldList extends Component {

  handleClick = (studyfield) => () => {
    this.props.selectField(studyfield);
  }

  render() {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Active</th>
            <th>Name</th>
            <th>Professor</th>
          </tr>
        </thead>
        <tbody>
          {this.props.studyfields.sort((a,b) => a.name > b.name).map((studyfield, index) =>
            <tr key={index} onClick={this.handleClick(studyfield)}>
              <td>{studyfield.isActive ? "true" : "false"}</td>
              <td>{studyfield.name}</td>
              <td>{studyfield.professor}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}