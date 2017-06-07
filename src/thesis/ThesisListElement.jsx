import React, { Component, PropTypes } from "react";
import moment from "moment";
import { Link } from "react-router";
import _ from "lodash";

/**
 * Weird component that receives 3 arrays as props (thesis-objects, two booleans)
 * of which it alters the selected & searched boolean-arrays.
 * So it is a two-way binding which is kinda hard to implement in React 
 */
export default class ThesisList extends Component {
  constructor() {
    super();
    this.state = {
      allTheses: [],
      inprogressTheses: [],
      allToggle: true,
      showOld: false,
      sortColumnToggle: [],
      searchValue: "",
    };
  }

  componentWillMount() {
    this.initState(this.props);
  }

  componentWillReceiveProps(newProps) {
    // initState only when new theses have been received
    if (!_.isEqual(this.props.theses, newProps.theses)) {
      this.initState(newProps);
    }
  }

  initState(props) {
    console.log("initingstate 2")
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
    const formatted = this.formatTheses(sorted);
    const filtered = formatted.filter(thesis => {
      if (thesis.status === "In progress") {
        return thesis;
      }
    });
    const selected = formatted.map(thesis => {
      return thesis.status === "In progress";
    });
    const searched = formatted.map(thesis => {
      return true;
    });
    props.selected.length = 0;
    props.searched.length = 0;
    props.selected.push(...selected);
    props.searched.push(...searched);
    this.setState({
      allTheses: formatted,
      inprogressTheses: filtered,
      searchedTheses: filtered,
      allToggle: true,
    });
  }

  formatTheses(theses) {
    return theses.map(thesis => {
      return {
        id: thesis.id,
        status: thesis.ThesisProgress.ethesisDone && thesis.ThesisProgress.graderEvalDone && thesis.ThesisProgress.printDone ?
          "Done" : "In progress",
        authorFirstname: thesis.authorFirstname,
        authorLastname: thesis.authorLastname,
        title: thesis.title,
        instructor: `${thesis.User.firstname} ${thesis.User.lastname}`,
        studyfield: thesis.StudyField.name,
        grade: thesis.grade,
        ethesisDone: thesis.ThesisProgress.ethesisDone,
        graderEvalDone: thesis.ThesisProgress.graderEvalDone,
        printDone: thesis.ThesisProgress.printDone
      };
    });
  }

  handleChange(type, index, event) {
    if (type === "search") {
      const searchValue = event.target.value.toLowerCase();
      // set value true at index inside props.searched-array if 
      // one of its fields contains the search value
      this.props.searched.forEach((item, index, array) => {
        const thesis = this.state.allTheses[index];
        for (const key in thesis) {
          if (thesis.hasOwnProperty(key) && thesis[key] && typeof thesis[key] === "string" && thesis[key].toLowerCase().indexOf(searchValue) !== -1) {
            array[index] = true;
            return;
          }
        }
        array[index] = false;
      });
      this.setState({
        searchValue,
      });
    } else if (type === "toggleShowOld") {
      // set value at index in props.selected -array to false
      // if the thesis is "Done" & showOld is false
      // otherwise just keep the old value
      this.props.selected.forEach((item, index, array) => {
        const status = this.state.allTheses[index].status;
        if (status === "In progress" || (status === "Done" && !this.state.showOld)) {
          array[index] = array[index];
        } else {
          array[index] = false;
        }
      });
      const theses = !this.state.showOld ? this.state.allTheses : this.state.inprogressTheses;
      this.setState({
        showOld: !this.state.showOld,
      });
    } else if (type === "toggleSelect") {
      this.props.selected[index] = !this.props.selected[index];
      this.setState({});
    } else if (type === "toggleRegReq") {
      this.props.toggleRegisterRequest(this.props.theses[index]);
      this.setState({});
    }
  }

  handleClick(type, index, event) {
    event.preventDefault();
    if (type === "sort") {
      // TODO > too much tinkering
      // this.sortByField(index);
    } else if (type === "toggleAll") {
      this.props.selected.forEach((item, index, array) => {
        const status = this.state.allTheses[index].status;
        if (status === "In progress" || (status === "Done" && this.state.showOld)) {
          array[index] = !this.state.allToggle;
        } else {
          array[index] = false;
        }
      });
      this.setState({
        allToggle: !this.state.allToggle
      });
    }
  }

  // sortByField(field) {
  //   console.log("sortin yo " + field);
  //   this.state.inprogressTheses.sort((a, b) => {
  //     if (a[field] < b[field]) return -1;
  //     if (a[field] > b[field]) return 1;
  //     return 0;
  //   });
  //   this.setState({});
  // }

  render() {
    const { allTheses, inprogressTheses } = this.state;
    const { searched } = this.props;
    const theses = allTheses.reduce((previousValue, thesis, index) => {
      if ((thesis.status === "In progress" || (thesis.status === "Done" && this.state.showOld)) && searched[index]) {
        const copy = Object.assign({ selected: this.props.selected[index] }, thesis);
        return [...previousValue, copy];
      }
      return previousValue;
    }, []);
    return (
      <div>
        <p>Theses done/all theses: {allTheses.length - inprogressTheses.length}/{allTheses.length}</p>
        <div className="ui middle aligned three columns grid">
          <div className="column">
            <div className="ui input" style={{ "width": "100%" }}>
              <input
                type="text"
                placeholder="Search..."
                onChange={this.handleChange.bind(this, "search", "")}
              />
            </div>
          </div>
          <div className="column">
            <div className="ui right input">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  checked={this.state.showOld ? "true" : ""}
                  onChange={this.handleChange.bind(this, "toggleShowOld", "")}
                />
                <label>Show also finished theses</label>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <button className="ui button blue" onClick={this.handleClick.bind(this, "toggleAll", "")}>
              Toggle all { this.state.allToggle ? "unselected" : "selected"}
            </button>
          </div>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th onClick={this.handleClick.bind(this, "sort", "status")}>Status</th>
              <th onClick={this.handleClick.bind(this, "sort", "status")}>EthesisDone</th>
              <th onClick={this.handleClick.bind(this, "sort", "status")}>GraderEvalDone</th>
              <th onClick={this.handleClick.bind(this, "sort", "status")}>PrintDone</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorLastname")}>Author lastname</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorFirstname")}>Author firstname</th>
              <th onClick={this.handleClick.bind(this, "sort", "title")}>Title</th>
              <th onClick={this.handleClick.bind(this, "sort", "instructor")}>Instructor</th>
              <th onClick={this.handleClick.bind(this, "sort", "studyfield")}>Studyfield</th>
              <th onClick={this.handleClick.bind(this, "sort", "grade")}>Grade</th>
              <th>Selected</th>
              <th>Register Request</th>
            </tr>
          </thead>
          <tbody>
            { theses.map((thesis, index) =>
              <tr key={index} >
                <td>{thesis.status}</td>
                <td>
                  <div className="ui checkbox">
                    <input
                      type="checkbox"
                      readOnly="true"
                      checked={thesis.ethesisDone ? "true" : ""}
                    />
                    <label></label>
                  </div>
                </td>
                <td>
                  <div className="ui checkbox">
                    <input
                      type="checkbox"
                      readOnly="true"
                      checked={thesis.graderEvalDone ? "true" : ""}
                    />
                    <label></label>
                  </div>
                </td>
                <td>
                  <div className="ui checkbox">
                    <input
                      type="checkbox"
                      readOnly="true"
                      checked={thesis.printDone ? "true" : ""}
                    />
                    <label></label>
                  </div>
                </td>
                <td>{thesis.authorLastname}</td>
                <td>{thesis.authorFirstname}</td>
                <td>
                  <Link to={`/thesis/${thesis.id}`}>{thesis.title}</Link>
                </td>
                <td>{thesis.instructor}</td>
                <td>{thesis.studyfield}</td>
                <td>{thesis.grade}</td>
                <td>
                  <div className="ui checkbox">
                    <input
                      type="checkbox"
                      readOnly="true"
                      checked={thesis.selected ? "true" : ""}
                      onChange={this.handleChange.bind(this, "toggleSelect", index)}
                    />
                    <label></label>
                  </div>
                </td>
                <td>
                  <div className="ui checkbox">
                    <input
                      type="checkbox"
                      readOnly="true"
                      checked={this.props.theses[index].regreq ? "true" : ""}
                      onChange={this.handleChange.bind(this, "toggleRegReq", index)}
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

ThesisList.propTypes = {
  theses: PropTypes.array,
  selected: PropTypes.array,
  searched: PropTypes.array,
  toggleRegisterRequest: PropTypes.func,
};
