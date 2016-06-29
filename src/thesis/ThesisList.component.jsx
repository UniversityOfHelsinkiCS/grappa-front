import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";
import moment from "moment";

export default class ThesisList extends Component {
  constructor() {
    super();
    this.state = {
      formattedTheses: [],
      filteredTheses: [],
    };
  }

  componentWillMount() {
    console.log("will mount");
    const formatted = this.formatThesesForReactTable(this.props.theses);
    // const filtered = this.filterOldTheses(formatted, !this.refs.checkOld.checked);
    const filtered = this.filterOldTheses(formatted, true);
    this.setState({
      formattedTheses: formatted,
      filteredTheses: filtered,
    });
  }

  formatThesesForReactTable(theses) {
    return theses.map(thesis => {
      return {
        status: thesis.ThesisProgress.isDone ? "Done" : "In progress",
        firstname: thesis.authorFirstname,
        lastname: thesis.authorLastname,
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

  handleCheckBoxClick(event) {
    const filtered = this.filterOldTheses(this.state.formattedTheses, !this.refs.checkOld.checked);
    this.setState({
      filteredTheses: filtered,
    });
  }

  render() {
    console.log(this.refs);
    const columns = [
      "status",
      "firstname",
      "lastname",
      "title",
      "instructor",
      "studyfield",
      "deadline",
    ];
    return (
      <div>
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
            <Th column="firstname">Author firstname</Th>
            <Th column="lastname">Author lastname</Th>
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
