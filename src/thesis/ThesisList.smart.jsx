/*
* ThesisList.smart for displaying the data relating to all the thesis added to the
* database. It contains the component for rendering the needed displayable data, and
* the container containing various functions for handling the connections between the
* component and Redux.
*/

import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { linkFormatter, studyFieldNameFormatter, dateFormatter } from "../config/helpers";



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
  }

  /*
  * Defines what is done at the beginning of the components life before rendering.
  */
  componentWillMount() {
    const { getTheses } = this.props;
    getTheses();
  }

  statusFormatter(cell, row, enumObj) {
    return enumObj[cell];
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
          <TableHeaderColumn dataField="ThesisProgress.isDone" dataFormat={this.statusFormatter} dataSort formatExtraData={ this.statuses } width="200" filter={ { options: this.statuses, type: "SelectFilter", defaultValue: false } }>Status</TableHeaderColumn>
          <TableHeaderColumn dataField="author" dataSort width="200">Author</TableHeaderColumn>
          <TableHeaderColumn dataField="title"  dataSort width="200">Thesis Title
          </TableHeaderColumn>
          <TableHeaderColumn dataField="instructor" dataSort width="200">Instructor
          </TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataSort width="200">Email</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.studyFieldNameFormatter} dataSort width="200">Field
          </TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.dateFormatter} dataSort width="200">Deadline
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
