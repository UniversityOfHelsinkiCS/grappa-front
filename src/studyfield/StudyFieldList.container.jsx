import React, { Component } from "react";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";
import Errors from "../ui/Errors.component";

export class StudyFieldList extends Component {

  constructor() {
    super();
    this.state = {
      StudyFields: [],
      newStudyField: {},
      editStudyField: {},
    };
  }

  componentWillMount() {
    const fields = this.props.StudyFields;
    const fieldsWithUsers = this.setUsersForStudyfields(fields, this.props.Users);
    // console.log(fields)
    // console.log(fieldsWithUsers)
    this.setState({
      StudyFields: fieldsWithUsers,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.StudyFields && newProps.Users) {
      const fields = newProps.StudyFields;
      const fieldsWithUsers = this.setUsersForStudyfields(fields, newProps.Users);
      this.setState({
        StudyFields: fieldsWithUsers,
      });
    }
  }

  handleChange(type, field, event) {
    if (type === "newStudyField") {
      this.state.newStudyField[field] = event.target.value;
      this.setState({});
    } else if (type === "updateStudyField") {
      if (field === "isActive") {
        this.state.editStudyField[field] = !this.state.editStudyField[field];
        this.setState({});
      } else {
        this.state.editStudyField[field] = event.target.value;
        this.setState({});
      }
    }
  }

  handleClick(type, index, event) {
    if (type === "save") {
      this.props.saveStudyField(this.state.newStudyField);
    } else if (type === "update" && this.state.editStudyField.id) {
      this.props.updateStudyField(this.state.editStudyField);
    } else if (type === "selectField") {
      this.state.editStudyField = this.state.StudyFields[index];
      this.setState({});
    }
  }

  setUsersForStudyfields(studyfields, users) {
    return studyfields.map(field => {
      field.Users = users.filter(user => {
        if (user.StudyField && user.StudyField.id === field.id) return user;
      });
      return field;
    });
  }

  render() {
    const { StudyFields } = this.state;
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
                <button className="ui primary button" onClick={this.handleClick.bind(this, "save")}>Save</button>
              </div>
            </div>
            <div className="field">
              <h2 className="ui dividing header">Update studyfield {this.state.editStudyField.name}</h2>
              <div className="three fields">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Name"
                    value={this.state.editStudyField.name}
                    onChange={this.handleChange.bind(this, "updateStudyField", "name")}
                  />
                </div>
                <div className="field">
                  <div className="ui checkbox">
                    <input
                      type="checkbox"
                      checked={this.state.editStudyField.isActive ? "true" : ""}
                      onChange={this.handleChange.bind(this, "updateStudyField", "isActive")}
                    />
                    <label>Active</label>
                  </div>
                </div>
                <div className="field">
                  <button className="ui green button" onClick={this.handleClick.bind(this, "update")}>Update</button>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <h2 className="ui dividing header">Studyfields</h2>
            <p>
              All old and current studyfields. Press a studyfield to start editing it. Note that changing studyfield's
              name changes it for every thesis connected to that field. If a field is no longer valid set it inactive
              and create a new one rather than changing old one's name.
            </p>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th onClick={this.handleClick.bind(this, "sort", "status")}>Active</th>
                  <th onClick={this.handleClick.bind(this, "sort", "authorFirstname")}>Name</th>
                  <th onClick={this.handleClick.bind(this, "sort", "authorLastname")}>Professor</th>
                  <th onClick={this.handleClick.bind(this, "sort", "title")}>Users</th>
                </tr>
              </thead>
              <tbody>
                { StudyFields.map((item, index) =>
                  <tr key={index} onClick={this.handleClick.bind(this, "selectField", index)}>
                    <td>{item.isActive ? "true" : "false"}</td>
                    <td>{item.name}</td>
                    <td>User</td>
                    <td>All users</td>
                  </tr>
                )}
              </tbody>
            </table>
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
  const user_r = state.get("user");
  return {
    StudyFields: studyfield_r.get("studyfields").toJS(),
    Users: user_r.get("users").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStudyFields() {
    dispatch(getStudyFields());
  },
  saveStudyField(data) {
    dispatch(saveStudyField(data));
  },
  updateStudyField(data) {
    dispatch(updateStudyField(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyFieldList);
