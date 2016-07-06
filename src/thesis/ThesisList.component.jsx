import React, { Component } from "react";
import moment from "moment";
import { Table, Thead, Th, unsafe } from "reactable";

export default class ThesisList extends Component {
  constructor() {
    super();
    this.state = {
      formattedTheses: [],
      filteredTheses: [],
      selectedTheses: [],
    };
  }

  componentWillMount() {
    console.log("will mount");
    const formatted = this.formatThesesForReactTable(this.props.theses);
    // const filtered = this.filterOldTheses(formatted, !this.refs.checkOld.checked);
    const filtered = this.filterOldTheses(formatted, true);
    const selected = filtered.map(item => {
      return true;
    });
    this.setState({
      formattedTheses: formatted,
      filteredTheses: filtered,
      selectedTheses: selected,
    });
  }

  componentWillReceiveProps(newProps) {
    const formatted = this.formatThesesForReactTable(newProps.theses);
    // const filtered = this.filterOldTheses(formatted, !this.refs.checkOld.checked);
    const filtered = this.filterOldTheses(formatted, true);
    const selected = filtered.map(item => {
      return true;
    });
    this.setState({
      formattedTheses: formatted,
      filteredTheses: filtered,
      selectedTheses: selected,
    });
  }

  handleClick(type, index, event) {
    if (type === "sort") {
      this.sortByField(index);
    } else if (type === "toggleSelect") {
      this.state.selected[index] = !this.state.selected[index];
      this.setState({});
    }
  }

  handleCheckBoxClick(event) {
    const filtered = this.filterOldTheses(this.state.formattedTheses, !this.refs.checkOld.checked);
    this.setState({
      filteredTheses: filtered,
    });
  }

  formatThesesForReactTable(theses) {
    return theses.map(thesis => {
      return {
        status: thesis.ThesisProgress.isDone ? "Done" : "In progress",
        authorFirstname: thesis.authorFirstname,
        authorLastname: thesis.authorLastname,
        title: unsafe(`<a href="/thesis/${thesis.id}" target="_blank">${thesis.title}</a>`),
        instructor: thesis.User.name,
        studyfield: thesis.StudyField.name,
        // deadline: thesis.deadline,
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

  toggleSelected() {

  }

  sortByField(field) {
    console.log("sortin yo " + field)
    this.state.filteredTheses.sort((a, b) => {
      if(a[field] < b[field]) return -1;
      if(a[field] > b[field]) return 1;
      return 0;
    });
    this.setState({});
  }

  render() {
    const { filteredTheses, selectedTheses } = this.state;
    return (
      <div>
        <div className="column">
          <div className="ui input m-right">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="ui right input">
            <div className="ui checkbox">
              <input ref="checkOld" type="checkbox" onClick={this.handleCheckBoxClick.bind(this)}/>
              <label>Show also finished theses</label>
            </div>
          </div>
          <div className="column">
            <button className="ui button blue">Toggle all</button>
          </div>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th onClick={this.handleClick.bind(this, "sort", "status")}>Status</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorFirstname")}>Author firstname</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorLastname")}>Author lastname</th>
              <th>Title</th>
              <th>Instructor</th>
              <th onClick={this.handleClick.bind(this, "sort", "studyfield")}>Studyfield</th>
              <th>Deadline</th>
              <th>Selected</th>
            </tr>
          </thead>
          <tbody>
            { filteredTheses.map((item, index) =>
              <tr key={index} onClick={this.handleClick.bind(this, "toggleSelect", index)}>
                <td>{item.status}</td>
                <td>{item.authorFirstname}</td>
                <td>{item.authorLastname}</td>
                <td>{"item.title"}</td>
                <td>{item.instructor}</td>
                <td>{item.studyfield}</td>
                <td>{item.deadline}</td>
                <td>
                  <div className="ui checkbox">
                    <input ref="checkOld" type="checkbox" checked={selectedTheses[index] ? "true" : ""}/>
                    <label></label>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
          </tfoot>
        </table>
      </div>
    );
  }

  oldrender() {
    // console.log(this.refs);
    const columns = [
      "status",
      "authorFirstname",
      "authorLastname",
      "title",
      "instructor",
      "studyfield",
      "deadline",
    ];
    return (
      <div>
        <h2 className="ui dividing header">Theses {this.state.formattedTheses.length - this.state.filteredTheses.length}/{this.state.formattedTheses.length}</h2>
        <GrappaList 
          className="ui table"
          noDataText="No theses found"
          ref="table"
          sortable columns={columns}
          data={this.state.filteredTheses}
          filterable={columns}
        />
        <h2 className="ui dividing header">Theses {this.state.formattedTheses.length - this.state.filteredTheses.length}/{this.state.formattedTheses.length}</h2>
          <div className="column">
            <div className="ui right input">
              <div className="ui checkbox">
                <input ref="checkOld" type="checkbox" onClick={this.handleCheckBoxClick.bind(this)}/>
                <label>Show also finished theses</label>
              </div>
            </div>
          </div>
        <Table
          className="ui table"
          noDataText="No theses found"
          ref="table"
          sortable columns={columns}
          data={this.state.filteredTheses}
          filterable={columns}
        >
          <Thead>
            <Th column="status">Status</Th>
            <Th column="authorFirstname">Author firstname</Th>
            <Th column="authorLastname">Author lastname</Th>
            <Th column="title">Title</Th>
            <Th column="instructor">Instructor</Th>
            <Th column="studyfield">Studyfield</Th>
            <Th column="deadline">Deadline</Th>
          </Thead>
        </Table>
      </div>
    );
  }
}

// ThesisList.propTypes = {
//   theses: PropTypes.array,
// };
