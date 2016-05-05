import React, { Component } from "react";

export default class Errors extends Component {

  render() {
    const { errors } = this.props;
    const errorList = Object.keys(errors).reduce((previous, key) =>
      [...previous, ...errors[key]]
    , []);
    if (errorList.length === 0) {
      return (
        <div></div>
      );
    }
    return (
      <div className="ui error message">
        <ul className="list">
          { errorList.map((error, index) => <li key={index}>{error}</li>) }
        </ul>
      </div>
    );
  }
}
