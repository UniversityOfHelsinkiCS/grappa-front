import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// import Thesis from "../thesis/Thesis.smart";

export class ThesisList extends Component {

  constructor() {
    super();
    this.getThesesAPI = this.getThesesAPI.bind(this);
  }

  componentDidMount() {
    const { getTheses } = this.props;
    getTheses();
  }

  getThesesAPI(event) {
    event.preventDefault();
    const { getTheses } = this.props;
  }



  render() {
    const { theses } = this.props;
    return (
      <div>
        <header>
          <h1 id="sign">Sign in as USER</h1>
          <div id="nav" className="ui vertical pointing menu">
            <a className="item">Home</a>
            <a className="item">Add new thesis</a>
            <a className="item active">View all theses</a>
          </div>
        </header>
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
      </div>
    );
  }
}
import { connect } from "react-redux";

import { getTheses } from "./thesis.actions";

const mapStateToProps = (state) => {
  const theses = state.get("theses");
  return {
    theses: theses.get("theseslist").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
