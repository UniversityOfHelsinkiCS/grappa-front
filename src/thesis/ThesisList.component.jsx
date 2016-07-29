import React, { Component, PropTypes } from "react";
import moment from "moment";
import { Link } from "react-router";

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
    // if old theses aren't the same as the new by comparing their pointers
    if (this.props.theses !== newProps.theses) {
      this.initState(newProps);
    }
  }

  initState(props) {
    console.log(props.theses);
    const formatted = this.formatTheses(props.theses);
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

  handleChange(type, event) {
    if (type === "search") {
      const value = event.target.value.toLowerCase();
      this.props.searched.forEach((item, index, array) => {
        const thesis = this.state.allTheses[index];
        for (const key in thesis) {
          if (thesis.hasOwnProperty(key) && key !== "id" && thesis[key].toLowerCase().indexOf(value) !== -1) {
            array[index] = true;
            return;
          }
        }
        array[index] = false;
      });
      this.setState({
        searchValue: value,
      });
    } else if (type === "toggleShowOld") {
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
    }
  }

  handleClick(type, index, event) {
    event.preventDefault();
    if (type === "sort") {
      this.sortByField(index);
    } else if (type === "toggleSelect") {
      this.props.selected[index] = !this.props.selected[index];
      this.setState({});
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
              Toggle all { this.state.allToggle ? "unselected" : "selected"}
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
            { theses.map((thesis, index) =>
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
                      checked={thesis.selected ? "true" : ""}
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
};
