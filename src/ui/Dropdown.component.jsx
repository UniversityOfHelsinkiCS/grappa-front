/*
* This React component is used to create a dynamic dropdown list of all the councilmeeting
* dates listed in the database.
* @param dateList This list of dates must be provided to the component as props,
* or it will not work.
* @param handleDateChange This change handler from ThesisCreate must be given to this component
* as props, as only that component has access to its state.
*/

import React, { Component } from "react";
export default class Dropdown extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.active = "Select Date";
  }
  /**
   * This method handles the selecting of an item in the list. The job of contacting councilmeeting.actions
   * is left to the change handler given in the props, leaving this handler to take care of changing
   * the "active" fields value to the selected one.
   */
  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
      this.active = event.target.value;
    }
  }
  dateFormatter(row) {
    const origDate = new Date(row);
    return `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;
  }
  /*
  * The method in charge of rendering the outlook of the page. Contains all the html elements.
  * @return select-container Container wrapping all the html elements to be rendered.
  */
  render() {
    const { data } = this.props;
    return (
      <select className="ui fluid search dropdown" value={this.active} onChange={this.handleChange}>
        { data.map((date, index) =>
          <option key={ index } value={ date.date } >
            { this.dateFormatter(date.date) }
          </option>
        )}
      </select>
    );
  }

}
