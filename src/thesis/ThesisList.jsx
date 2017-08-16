import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router";
import _ from "lodash";
import ThesisListElement from "./ThesisListElement";

/**
 * Weird component that receives 3 arrays as props (thesis-objects, two booleans)
 * of which it alters the selected & searched boolean-arrays.
 * So it is a two-way binding which is kinda hard to implement in React 
 */
export default class ThesisList extends Component {
  constructor() {
    super();
    this.state = {
      shownThesesIds: [],
      selectedThesesIds: [],
      allToggle: true,
      showOld: false,
      searchValue: "",
    };
  }

  componentDidMount() {
    this.initState(this.props);
  }

  componentWillReceiveProps(newProps) {
    // initState only when new theses have been received
    if (!_.isEqual(this.props.theses, newProps.theses)) {
      this.initState(newProps);
    }
  }

  initState(props) {
    // sort theses by lastname first then firstname
    const sorted = props.theses.sort((a, b) => {
      if (a.authorLastname < b.authorLastname) {
        return -1;
      } else if (a.authorLastname > b.authorLastname) {
        return 1;
      } else if (a.authorFirstname < b.authorFirstname) {
        return -1;
      } else if (a.authorFirstname > b.authorFirstname) {
        return 1;
      } else {
        return 0;
      }
    });

    const filtered = sorted.filter(thesis => thesis.status === "In progress").map(thesis => thesis.id);
    //const filtered = sorted.map(thesis => thesis.status === "In progress");

    this.setState({ shownThesesIds: filtered, selectedThesesIds: filtered });
    this.toggleAllTheses(this.state.allToggle, filtered);
  }

  searchTheses = (event) => {
    const searchValue = event.target.value.toLowerCase();
    this.setState({ searchValue });
    this.filterTheses(this.state.showOld, searchValue);
  }

  showOldTheses = () => {
    this.setState({ showOld: !this.state.showOld });
    this.filterTheses(!this.state.showOld, this.state.searchValue);
  }

  filterTheses = (showOld, searchValue) => {
    const theses = this.props.theses.filter((thesis, index, array) => {
      if (thesis.status === "In progress" || (thesis.status === "Done" && showOld)) {
        for (const key in thesis) {
          if (thesis.hasOwnProperty(key) && thesis[key] && typeof thesis[key] === "string" && thesis[key].toLowerCase().includes(searchValue)) {
            return true;
          }
        }
      }
      return false;
    }).map(thesis => thesis.id);
    this.setState({ shownThesesIds: theses });
  }

  toggleAllTheses = (selectAll, theses) => {
    if (selectAll) {
      this.setState({ selectedThesesIds: theses });
    } else {
      this.setState({ selectedThesesIds: [] });
    }
  }

  selectThesis = (thesisId) => {
    const index = this.state.selectedThesesIds.indexOf(thesisId);
    if (index > -1) {
      this.setState({
        selectedThesesIds: this.state.selectedThesesIds.filter(id => id !== thesisId)
      });
    } else {
      this.setState({ selectedThesesIds: [...this.state.selectedThesesIds, thesisId] });
    }
  }


  toggleAll = () => {
    this.toggleAllTheses(!this.state.allToggle, this.state.shownThesesIds);
    this.setState({ allToggle: !this.state.allToggle });
  }

  sendStudentNotification = (thesisId) => {
    this.props.sendRegistrationEmail(thesisId);
  }

  toggleRegistrationRequest = (thesisId) => {
    this.props.toggleRegisterRequest(thesisId);
  }

  render() {
    const theses = this.props.theses.filter(thesis => {
      return this.state.shownThesesIds.includes(thesis.id);
    });
    /*const theses = this.props.theses.reduce((previousValue, thesis, index) => {
      if ((thesis.status === "In progress" || (thesis.status === "Done" && this.state.showOld)) && this.state.shownThesesIds
[index]) {
        const copy = Object.assign({ selected: this.state.shownThesesIds
  [index] }, thesis);
        return [...previousValue, copy];
      }
      return previousValue;
    }, []);*/
    return (
      <div>
        <div className="ui middle aligned three columns grid">
          <div className="column">
            <div className="ui input" style={{ "width": "100%" }}>
              <input
                type="text"
                placeholder="Search..."
                value={this.state.searchValue}
                onChange={this.searchTheses}
              //onChange={this.handleChange.bind(this, "search", "")}
              />
            </div>
          </div>
          <div className="column">
            <div className="ui right input">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  checked={this.state.showOld ? "true" : ""}
                  onChange={this.showOldTheses}
                //onChange={this.handleChange.bind(this, "toggleShowOld", "")}
                />
                <label>Show also finished theses</label>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <button className="ui button blue" onClick={this.toggleAll}>
              Toggle all {this.state.allToggle ? "unselected" : "selected"}
            </button>
          </div>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Ethesis Done</th>
              <th>GraderEval Done</th>
              <th>Print Done</th>
              <th>Author lastname</th>
              <th>Author firstname</th>
              <th>Title</th>
              <th>Instructor</th>
              <th>Studyfield</th>
              <th>Grade</th>
              <th>Selected</th>
              <th>Register request</th>
              <th>Registration Done</th>
            </tr>
          </thead>
          <tbody>
            {theses.map((thesis, index) =>
              <ThesisListElement
                thesis={thesis}
                selected={this.state.selectedThesesIds.includes(thesis.id)}
                selectThesis={this.selectThesis}
                sendStudentNotification={this.sendStudentNotification}
                toggleRegistrationRequest={this.toggleRegistrationRequest}
                key={index} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}