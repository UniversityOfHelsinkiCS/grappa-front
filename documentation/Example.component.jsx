/**
 * Throughly documented example Component
 */

/**
 * Libraries/files to be imported to this module
 * Path starts always from this file itself
 */
import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router";

/**
 * Sets this App-class to be the default import when you write
 * 'import AppOrWhateverYouWantToCallIt from "../documentation/Example"'
 * You can also set defined imports without 'default' keyword which are then imported as:
 * 'import { someMethod } from "../documentation/Example"'
 */
export default class ThesisList extends Component {
  constructor() {
    super();
    this.state = {
      formattedTheses: [],
      filteredTheses: [],
      allToggle: false,
      showOld: false,
      sortColumnToggle: [],
      searchValue: "",
    };
  }

  /**
   * The method that is called when this component is created aka. mounted
   *
   * Every React component has bunch of different methods for different parts of its
   * lifecycle in which you can put your own code that will be then called.
   * Here simply theses are being formatted into more suitable form and list of filtering
   * statuses is being set to default all-true. Then the state is set which causes 
   * the component to automatically update.
   *
   */
  componentWillMount() {
    const formatted = this.formatTheses(this.props.theses);
    const filtered = this.filterOldTheses(formatted, true);
    const selected = filtered.map(thesis => {
      return true;
    });
    this.props.selected.push(...selected);
    this.setState({
      formattedTheses: formatted,
      filteredTheses: filtered,
      allToggle: false,
    });
  }

  /**
   * This method is called when ever component's props are being changed
   *
   * Because this happens often when api call is being made it's better to assume
   * data is being changed so the theses are being re-initiliazed. 
   * @param {Object} newProps - New props being received
   */
  componentWillReceiveProps(newProps) {
    const formatted = this.formatTheses(newProps.theses);
    const filtered = this.filterOldTheses(formatted, this.state.showOld);
    const selected = filtered.map(thesis => {
      return true;
    });
    newProps.selected.push(...selected);
    this.setState({
      formattedTheses: formatted,
      filteredTheses: filtered,
      allToggle: false,
    });
  }

  /**
   * Custom 'change handler' to is called whenever input's value is changed
   *
   * Rather than creating multiple different change handlers I prefer making one
   * with if cases to accommodate different input types. Thing to note here is 
   * that event is not being prevented from happening as it causes value's not to change.
   * @param { string } type - Input's type that's being changed
   * @param { Object } event - DOM event caused by the change
   */
  handleChange(type, event) {
    if (type === "search") {
      const value = event.target.value;
      const filtered = this.props.graders.map((item, index) => {
        return item.name.toLowerCase().indexOf(value) === -1 &&
          item.title.toLowerCase().indexOf(value) === -1;
      });
      this.setState({
        searchValue: value,
        filtered,
      });
    } else if (type === "toggleShowOld") {
      const filtered = this.filterOldTheses(this.state.formattedTheses, this.state.showOld);
      this.setState({
        filteredTheses: filtered,
        showOld: !this.state.showOld,
      });
    }
  }

  /**
   * Custom 'click handler' for click events over elements
   *
   * Same as the handleChange but for click-events. It has index parameter for
   * defining the thesis that is being clicked. Also event is being prevented
   * although I don't think it matters in this case.
   * @param {string} type - Type of this action
   * @param {number} index - Index of the thesis in the list
   * @param {object} event - DOM click event
   */
  handleClick(type, index, event) {
    event.preventDefault();
    if (type === "sort") {
      this.sortByField(index);
    } else if (type === "toggleSelect") {
      this.props.selected[index] = !this.props.selected[index];
      this.setState({});
    } else if (type === "toggleAll") {
      this.props.selected.forEach((item, index, array) => {
        array[index] = this.state.allToggle;
      });
      this.setState({
        allToggle: !this.state.allToggle
      });
    }
  }

  formatTheses(theses) {
    return theses.map(thesis => {
      return {
        id: thesis.id,
        status: thesis.ThesisProgress.done ? "Done" : "In progress",
        authorFirstname: thesis.authorFirstname,
        authorLastname: thesis.authorLastname,
        title: thesis.title,
        instructor: thesis.User.name,
        studyfield: thesis.StudyField.name,
        deadline: moment(new Date(thesis.deadline)).format("DD/MM/YYYY"),
      };
    });
  }

  filterOldTheses(theses, condition) {
    return theses.filter(thesis => {
      if (thesis.status === "In progress" || (thesis.status === "Done" && !condition)) {
        return thesis;
      }
    });
  }

  sortByField(field) {
    console.log("sortin yo " + field);
    this.state.filteredTheses.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    this.setState({});
  }

  /**
   * Method for rendering this Component into 'real' html
   *
   * Is the default method for creating React-components.
   * @return { DOM Element <div> } - Returns a single div
   */
  render() {
    const { filteredTheses } = this.state;
    return (
      <div>
        <div className="ui middle aligned three columns grid">
          <div className="column">
            <div className="ui input" style={{ "width": "100%" }}>
              <input
                type="text"
                placeholder="Search..."
                onChange={this.handleChange.bind(this, "search")}
              />
            </div>
          </div>
          <div className="column">
            <div className="ui right input">
              <div className="ui checkbox">
                <input 
                  type="checkbox" 
                  checked={this.state.showOld ? "true" : ""}
                  onChange={this.handleChange.bind(this, "toggleShowOld")}
                />
                <label>Show also finished theses</label>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <button className="ui button blue" onClick={this.handleClick.bind(this, "toggleAll", "")}>
              Toggle all { this.state.allToggle ? "selected" : "unselected" }
            </button>
          </div>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th onClick={this.handleClick.bind(this, "sort", "status")}>Status</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorFirstname")}>Author firstname</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorLastname")}>Author lastname</th>
              <th onClick={this.handleClick.bind(this, "sort", "title")}>Title</th>
              <th onClick={this.handleClick.bind(this, "sort", "instructor")}>Instructor</th>
              <th onClick={this.handleClick.bind(this, "sort", "studyfield")}>Studyfield</th>
              <th onClick={this.handleClick.bind(this, "sort", "deadline")}>Deadline</th>
              <th>Selected</th>
            </tr>
          </thead>
          <tbody>
            { filteredTheses.map((thesis, index) =>
              <tr key={index} onClick={this.handleClick.bind(this, "toggleSelect", index)}>
                <td>{thesis.status}</td>
                <td>{thesis.authorFirstname}</td>
                <td>{thesis.authorLastname}</td>
                <td>
                  <Link to={`/thesis/${thesis.id}`}>{thesis.title}</Link>
                </td>
                <td>{thesis.instructor}</td>
                <td>{thesis.studyfield}</td>
                <td>{thesis.deadline}</td>
                <td>
                  <div className="ui checkbox">
                    <input
                      type="checkbox"
                      readOnly="true"
                      checked={this.props.selected[index] ? "true" : ""}
                    />
                    <label></label>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

// ThesisList.propTypes = {
//   theses: PropTypes.array,
// };

/**
 * Required props this component needs to be rendered
 */
App.propTypes = {
  children: PropTypes.node,
};