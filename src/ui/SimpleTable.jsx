import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router";

export default class SimpleTable extends Component {
  constructor() {
    super();
    this.state = {
      formattedTheses: [],
      filteredTheses: [],
      allToggle: false,
      sortColumnToggle: [],
      searchValue: "",
    };
  }

  componentWillMount() {
    const formatted = this.formatTheses(this.props.theses);
    // const filtered = this.filterOldTheses(formatted, !this.refs.checkOld.checked);
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

  componentWillReceiveProps(newProps) {
    const formatted = this.formatTheses(newProps.theses);
    // const filtered = this.filterOldTheses(formatted, !this.refs.checkOld.checked);
    const filtered = this.filterOldTheses(formatted, true);
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

  handleChange(type, event) {
    event.preventDefault();
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
        array[index] = this.state.allToggle;
      });
      this.setState({
        allToggle: !this.state.allToggle
      });
    }
  }

  handleCheckBoxClick(event) {
    event.preventDefault();
    const filtered = this.filterOldTheses(this.state.formattedTheses, !this.refs.checkOld.checked);
    this.setState({
      filteredTheses: filtered,
    });
  }

  formatTheses(theses) {
    return theses.map(thesis => {
      return {
        id: thesis.id,
        status: thesis.ThesisProgress.isDone ? "Done" : "In progress",
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
    // console.log("sortin yo " + field);
    this.state.filteredTheses.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    this.setState({});
  }

  render() {
    const { options } = this.props;
    return (
      <table {...this.props}>
         { options.search ?
          <div className="column">
            <div className="ui input" style={{ "width": "100%" }}>
              <input
                type="text"
                placeholder="Search..."
                onChange={this.handleChange.bind(this, "search")}
              />
            </div>
          </div>
            :
          <div className="column">
           "no search"
          </div>
        }
      </table>
    );

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
                <input ref="checkOld" type="checkbox" onClick={this.handleCheckBoxClick.bind(this)}/>
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
                  <Link to={`/v1/thesis/${thesis.id}`}>{thesis.title}</Link>
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

  renderOld() {
    const onlyActive = this.props.users.filter(user => {
      if (user.isActive) return user;
    });
    const users = onlyActive.map(user => {
      let name = "";
      if (user.StudyField) {
        name = user.StudyField.name;
      }
      user.studyfield = name;
      return user;
    });
    const columns = [
      "role",
      "studyfield",
      "name",
      "email",
    ];
    return (
      <div>
        <h2 className="ui dividing header">Users</h2>
        <p>
          All registered and activated users. Retiring an user disables the account but doesn't delete it from the database and it can be reversed.
        </p>
        <STable
          className="ui table"
          ref="table"
          options={
            {
              data: users,
              selected: selected,
              sortable: columns,
              filterable: columns,
              noDataText: "No users found dawg",
              rowClass: "ui row lolz"
            }
          }
        >
          <SHead>
            <STh className="penis" column="name" customColumn={(item, index) => {
              return (
                <td><Link to={`/v1/user/${item.id}`}>{item.name}</Link></td>
              );
            }}>
            </STh>
          </SHead>
        </STable>
        <Table
          className="ui table"
          noDataText="No users found"
          ref="table"
          sortable columns={columns}
          data={users}
          filterable={columns}
        >
          <Thead>
            <Th column="role">Role</Th>
            <Th column="studyfield">Field</Th>
            <Th column="name">Name</Th>
            <Th column="email">Email</Th>
            <Th column="edit">Edit</Th>
            <Th column="retire">Retire</Th>
          </Thead>
        </Table>
      </div>
    );
  }
}
