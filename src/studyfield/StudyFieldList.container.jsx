import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";

export class StudyFieldList extends Component {

  handleChange(type, event) {

  }

  handleClick(type, event) {

  }

  render() {
    const { StudyFields } = this.props;
    const columns = [
      "isActive",
      "name",
      "",
      "",
    ];
    return (
      <div className="ui form">
        <div className="ui two fields">
          <div className="field">
            <h2 className="ui dividing header">Create a studyfield</h2>
            <div className="two fields">
              <div className="field">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={this.handleChange.bind(this, "newStudyField")}
                />
              </div>
              <div className="field">
                <button className="ui primary button" onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
          <div className="field">
            <h2 className="ui dividing header">Studyfields</h2>
            <p>
              All old and current studyfields. Press retire to disable a studyfield.
            </p>
            <Table
              className="ui table"
              noDataText="No users found"
              ref="table"
              sortable columns={columns}
              data={StudyFields}
              filterable={columns}
            >
              <Thead>
                <Th column="isActive">Active</Th>
                <Th column="name">Name</Th>
                <Th column="professor">Professor</Th>
                <Th column="title">Edit</Th>
                <Th column="title">Retire</Th>
              </Thead>
            </Table>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <h2 className="ui dividing header">Studyfields</h2>
        <p>
          All old and current studyfields. Press retire to disable a studyfield.
        </p>
        <Table
          className="ui table"
          noDataText="No users found"
          ref="table"
          sortable columns={columns}
          data={StudyFields}
          filterable={columns}
        >
          <Thead>
            <Th column="isActive">Active</Th>
            <Th column="name">Name</Th>
            <Th column="professor">Professor</Th>
            <Th column="title">Edit</Th>
            <Th column="title">Retire</Th>
          </Thead>
        </Table>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getStudyFields, saveStudyField, updateStudyField } from "./studyfield.actions";

const mapStateToProps = (state) => {
  const studyfield_r = state.get("studyfield");
  return {
    StudyFields: studyfield_r.get("studyfields").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStudyFields() {
    dispatch(getStudyFields());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyFieldList);
