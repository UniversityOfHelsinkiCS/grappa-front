import React, { Component } from "react";
import ThesisList from "../thesis-list/ThesisList.smart";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export class App extends Component {

  render() {
    const { theses } = this.props;
    const these = theses.toJS();
    return (
      <div>
        <header>
          <h1 id="sign">Sign in as USER</h1>
          <div id="nav" className="ui vertical pointing menu">
            <a className="item">Home</a>
            <a className="item active">Add new thesis</a>
            <a className="item">View all theses</a>
          </div>
        </header>

        <div className="thesis-listings-container">
          <BootstrapTable data={these} striped={true} hover={true} columnFilter={true} pagination={true}>
            <TableHeaderColumn dataField="id" isKey={true} hidden={true}>Thesis ID</TableHeaderColumn>
            <TableHeaderColumn dataField="author" dataSort={true} dataAlign="center" width="200">Author</TableHeaderColumn>
            <TableHeaderColumn dataField="title" dataSort={true} dataAlign="center" width="400">Thesis Title</TableHeaderColumn>
            <TableHeaderColumn dataField="instructor" dataSort={true} dataAlign="center" width="200">Instructor</TableHeaderColumn>
            <TableHeaderColumn dataField="email" hidden={true}>Email</TableHeaderColumn>
            <TableHeaderColumn dataField="urkund" hidden={true}>Urkund</TableHeaderColumn>
            <TableHeaderColumn dataField="ethesis" hidden={true}>Ethesis</TableHeaderColumn>
            <TableHeaderColumn dataField="abstract" hidden={true}>Abstract</TableHeaderColumn>
            <TableHeaderColumn dataField="grade" hidden={true}>Grade</TableHeaderColumn>
            <TableHeaderColumn dataField="field" dataSort={true} dataAlign="center"width="200">Field</TableHeaderColumn>
            <TableHeaderColumn dataField="deadline" dataSort={true} dataAlign="center" width="200">Deadline</TableHeaderColumn>
          </BootstrapTable>,
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const theses = state.get("theses");
  return {
    theses: theses.get("theseslist"),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, null)(App);
