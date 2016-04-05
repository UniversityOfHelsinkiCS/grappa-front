import React, { Component } from "react";
export default class Dropdown extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.active = "Select Date";
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
      this.active = event.target.value;
    }
  }

  render() {
    const { data } = this.props;

    console.log(data);
    return (
      <select className="ui fluid search dropdown" value={this.active} onChange={this.handleChange}>
        { data.map(function (date, index) {
          return <option key={ index } value={ date.date }>{ date.date }</option>;
        }) }
      </select>
    );
  }

}
