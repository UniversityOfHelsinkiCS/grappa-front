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
      theses: [],
      formattedTheses: [],
      filteredTheses: [],
    };
  }

  /**
  * Defines what is done at the beginning of the components life before rendering.
  * Switches the state used by Table between all and in progress theses
  */
  componentWillMount() {
    this.props.getTheses();
  }

  componentWillReceiveProps(newProps) {
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
        status: "done",
        author: thesis.author,
        title: thesis.title,
        instructor: thesis.User.name,
        studyfield: thesis.StudyField.name,
        deadline: thesis.deadline,
      };
    });
  }

  filterOldTheses(theses, condition) {
    return theses.filter(thesis => {
      if (thesis.status === "in progress" || (thesis.status === "done" && !condition)) {
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
  /**
   * Selects desired fields from raw thesis objects and formats them
   * We keep track of two sets of theses: all and only in progress
   */
  // selectFields(theses) {
  //   for (let i = 0; i < theses.length; i++) {
  //     const origDate = new Date(theses[i].deadline);
  //     const newDate = `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;
  //     const link = '<a href="thesis/' + theses[i].id + '">' + theses[i].title + "</a>";
  //     const newThesis = {
  //       Status: theses[i].ThesisProgress.isDone ? "Done" : "In progress",
  //       Author: theses[i].author,
  //       title: unsafe(link),
  //       graders: theses[i].User.name,
  //       StudyField: theses[i].StudyField.name,
  //       deadline: newDate,
  //     };
  //     if (!theses[i].ThesisProgress.isDone) {
  //       this.state.inProgressTheses.push(newThesis);
  //     }
  //     this.state.allTheses.push(newThesis);
  //   }
  // }

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
            <input ref="checkOld"
              type="checkbox" onClick={this.handleCheckBoxClick.bind(this)}
            />
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

/**
* A special funciton used to define what the form of the data is that is gotten from the state.
* #return ListOfThesis A list containing all the thesis listed in the database.
*/
const mapStateToProps = (state) => {
  const auth = state.get("auth");
  const thesis = state.get("thesis");
  return {
    theses: thesis.get("theses").toJS(),
    user: auth.get("user").toJS(),
  };
};

/**
* A special function used to define and dispatch the relevant data to the right
* actions in thesis.actions.
*/
const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
