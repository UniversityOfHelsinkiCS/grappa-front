import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// import Thesis from "../thesis/Thesis.smart";

export class ThesisList extends Component {

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
          <BootstrapTable data={theses} search bordered={false}>
            <TableHeaderColumn filter= {{ type:"TextFilter" }} dataField="id" isKey hidden>
            Thesis ID</TableHeaderColumn>
            <TableHeaderColumn dataField="author" dataSort width="200">Author</TableHeaderColumn>
            <TableHeaderColumn dataField="title" dataSort width="400">Thesis Title
            </TableHeaderColumn>
            <TableHeaderColumn dataField="instructor" dataSort width="200">Instructor
            </TableHeaderColumn>
            <TableHeaderColumn dataField="email" hidden>Email</TableHeaderColumn>
            <TableHeaderColumn dataField="urkund" hidden>Urkund</TableHeaderColumn>
            <TableHeaderColumn dataField="ethesis" hidden>Ethesis</TableHeaderColumn>
            <TableHeaderColumn dataField="abstract" hidden>Abstract</TableHeaderColumn>
            <TableHeaderColumn dataField="grade" hidden>Grade</TableHeaderColumn>
            <TableHeaderColumn dataField="field" dataSort width="200">Field</TableHeaderColumn>
            <TableHeaderColumn dataField="deadline" dataSorT width="200">Deadline
            </TableHeaderColumn>
          </BootstrapTable>,
        </div>
      </div>
    );
  }
}
import { connect } from "react-redux";
// export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
export default connect()(ThesisList);
