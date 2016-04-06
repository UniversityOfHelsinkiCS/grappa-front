/*
* ThesisList.smart for displaying the data relating to all the thesis added to the
* database. It contains the component for rendering the needed displayable data, and
* the container containing various functions for handling the connections between the
* component and Redux.
*/

import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export class ThesisList extends Component {
  constructor() {
    super();
  }

  /*
  * Defines what is done at the beginning of the components life before rendering.
  */
  componentDidMount() {
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
    return (
      <div>
        <h2>Theses</h2>
        <BootstrapTable data={theses} search bordered={false}>
          <TableHeaderColumn filter= {{ type: "TextFilter" }} dataField="id" isKey hidden>
          Thesis ID</TableHeaderColumn>
          <TableHeaderColumn dataField="author" dataSort width="200">Author</TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataSort width="400">Thesis Title
          </TableHeaderColumn>
          <TableHeaderColumn dataField="instructor" dataSort width="200">Instructor
          </TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataSort width="400">Email</TableHeaderColumn>
          <TableHeaderColumn dataField="StudyFieldId" dataSort width="200">Field
          </TableHeaderColumn>
          <TableHeaderColumn dataField="deadline" dataSorT width="200">Deadline
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
  const theses = state.get("theses");
  return {
    theses: theses.get("theseslist").toJS(),
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
