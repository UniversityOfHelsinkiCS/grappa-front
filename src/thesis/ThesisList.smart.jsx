/*
* ThesisList.smart for displaying the data relating to all the thesis added to the
* database. It contains the component for rendering the needed displayable data, and
* the container containing various functions for handling the connections between the
* component and Redux.
*/

import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { linkFormatter, studyFieldNameFormatter, dateFormatter, instructorFormatter, statusFormatter } from "../config/helpers";


export class ThesisList extends Component {
  constructor() {
    super();
    this.linkFormatter = linkFormatter.bind(this);
    this.studyFieldNameFormatter = studyFieldNameFormatter.bind(this);
    this.statuses = {
      true: "Done",
      false: "In progress",
    };
    this.dateFormatter = dateFormatter.bind(this);
    this.instructorFormatter = instructorFormatter.bind(this);
    this.statusFormatter = statusFormatter.bind(this);
  }

  /*
  * Defines what is done at the beginning of the components life before rendering.
  */
  componentWillMount() {
    const { getTheses } = this.props;
    getTheses();
  }

  /*
  * The method in charge of rendering the outlook of the page. Contains all the html elements.
  * Contains a react-bootstrap-table library styled table.
  * @return <div>-container Container wrapping all the html elements to be rendered.
  */

  render() {
    const { theses } = this.props;
    console.log(theses);
    return (
      <div>
        <h2>Theses</h2>
        <BootstrapTable data={theses} search bordered={false}>
          <TableHeaderColumn filter= {{ type: "TextFilter" }} dataField="id" isKey hidden>
          Thesis ID</TableHeaderColumn>
          <TableHeaderColumn dataField="isDone" dataFormat={ this.statusFormatter } formatExtraData={ this.statuses } >Status</TableHeaderColumn>
          <TableHeaderColumn dataField="author" dataSort >Author</TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataFormat={ this.linkFormatter } dataSort >Thesis Title</TableHeaderColumn>
          <TableHeaderColumn dataFormat={ this.instructorFormatter } dataSort >Instructor
          </TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataSort >Email</TableHeaderColumn>
          <TableHeaderColumn dataFormat={ this.studyFieldNameFormatter } dataSort>Field
          </TableHeaderColumn>
          <TableHeaderColumn dataFormat={ this.dateFormatter } dataSort >Deadline
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
      );
  }
}
import { connect } from "react-redux";
import { getTheses } from "./thesis.actions";

/*
* A special funciton used to define what the form of the data is that is gotten from the state.
* @return ListOfThesis A list containing all the thesis listed in the database.
*/
const mapStateToProps = (state) => {
  const user = state.get("auth").get("user");
  const thesis = state.get("thesis");
  return {
    theses: thesis.get("theses").toJS(),
    user: user.toJS(),
  };
};

/*
* A special function used to define and dispatch the relevant data to thesis.actions
*/
const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
