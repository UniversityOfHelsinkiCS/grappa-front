/**
* ThesisList.smart for displaying the data relating to all the thesis added to the
* database. It contains the component for rendering the needed displayable data, and
* the container containing various functions for handling the connections between the
* component and Redux.
*/

import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";
import moment from "moment";

export class ThesisList extends Component {
  constructor() {
    super();
    this.state = {
      formattedTheses: [],
      filteredTheses: [],
    };
  }

  componentWillMount() {
    this.props.getTheses();
  }

  componentWillReceiveProps(newProps) {
    console.log("received props");
    const formatted = this.formatThesesForReactTable(newProps.theses);
    const filtered = this.filterOldTheses(formatted, !this.refs.checkOld.checked);
    this.setState({
      formattedTheses: formatted,
      filteredTheses: filtered,
    });
  }

  formatThesesForReactTable(theses) {
    return theses.map(thesis => {
      return {
        status: thesis.ThesisProgress.isDone ? "Done" : "In progress",
        author: thesis.author,
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
    const columns = [
      "status",
      "author",
      "title",
      "instructor",
      "studyfield",
      "deadline",
    ];
    return (
      <div>
        <h2 className="ui dividing header">Theses</h2>
        <div className="ui right input">
          <div className="ui checkbox">
            <input ref="checkOld" type="checkbox" onClick={this.handleCheckBoxClick.bind(this)}/>
            <label>Show also finished theses</label>
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
            <Th column="author">Author</Th>
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

import { connect } from "react-redux";
import { getTheses } from "./thesis.actions";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  const thesis = state.get("thesis");
  return {
    theses: thesis.get("theses").toJS(),
    user: auth.get("user").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
