<<<<<<< HEAD:src/thesis/ThesisList.smart.jsx
import React, { Component, PropTypes } from "react";

import ThesisListItem from "./ThesisListItem.smart";

export class ThesisList extends Component {

  constructor() {
    super();
    this.getThesesAPI = this.getThesesAPI.bind(this);
    this.resetTheses = this.resetTheses.bind(this);
  }

  getThesesAPI(event) {
    event.preventDefault();
    const { getTheses } = this.props;
    getTheses();
  }

  resetTheses(event) {
    event.preventDefault();
    const { resetTheses } = this.props;
    resetTheses();
  }

=======
import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// import Thesis from "../thesis/Thesis.smart";

export class ThesisList extends Component {

>>>>>>> thesislistings:src/thesis-list/ThesisList.smart.jsx
  render() {
    const { theses } = this.props;
    const theseslist = theses.toJS();
    return (
<<<<<<< HEAD:src/thesis/ThesisList.smart.jsx
      <div className="thesis-container">
        <h2>Tämä on ThesisList komponentti</h2>
        <div>
          <button onClick={this.getThesesAPI}>getTheses from api</button>
          <button onClick={this.resetTheses}>resetTheses</button>
        </div>
        <ul>
          { theseslist.map(itemi =>
            <li>
              <ThesisListItem
                id = { itemi.id }
                author = { itemi.author }
                email = { itemi.email }
                title = { itemi.title }
                urkund = { itemi.urkund }
                ethesis = { itemi.ethesis }
                abstract = { itemi.abstract }
                grade = { itemi.grade }
              />
            </li>
          )}
        </ul>
=======
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
>>>>>>> thesislistings:src/thesis-list/ThesisList.smart.jsx
      </div>
    );
  }
}
<<<<<<< HEAD:src/thesis/ThesisList.smart.jsx

import { connect } from "react-redux";

import { getTheses, resetTheses } from "../thesis/thesis.actions";

const mapStateToProps = (state) => {
  const theses = state.get("theses");
  return {
    theses: theses.get("theseslist"),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
  resetTheses() {
    dispatch(resetTheses());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
=======
import { connect } from "react-redux";
// export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
export default connect()(ThesisList);
>>>>>>> thesislistings:src/thesis-list/ThesisList.smart.jsx
