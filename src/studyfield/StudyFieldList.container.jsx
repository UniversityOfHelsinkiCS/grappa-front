import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";

export class StudyFieldList extends Component {

  constructor() {
    super();
    this.state = {
      newStudyField: {},
    }
  }

  handleChange(type, index, event) {
    if (type === "newStudyField") {
      this.state.newStudyField[index] = event.target.value
      this.setState({});
    }
  }

  handleClick(type, event) {
    if (type === "submit") {
      this.props.saveStudyField(this.state.newStudyField);
    }
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
                  onChange={this.handleChange.bind(this, "newStudyField", "name")}
                />
              </div>
              <div className="field">
                <button className="ui primary button" onClick={this.handleClick.bind(this, "submit")}>Submit</button>
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
                <Th column="edit">Edit</Th>
                <Th column="retire">Retire</Th>
              </Thead>
            </Table>
          </div>
        </div>
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
  saveStudyField(data) {
    dispatch(saveStudyField(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyFieldList);
