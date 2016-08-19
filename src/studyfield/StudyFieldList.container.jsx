import React, { Component } from "react";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";

export class StudyFieldList extends Component {

  constructor() {
    super();
    this.state = {
      StudyFields: [],
      newStudyField: Validate.createForm("newStudyField", "studyfield"),
      updateStudyField: Validate.createForm("updateStudyField", "studyfieldEdit"),
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("newStudyField", "sl", (newStudyField) => { this.setState({ newStudyField, });});
    Validate.subscribeToForm("updateStudyField", "sl", (updateStudyField) => { this.setState({ updateStudyField, });});
    const fields = this.props.StudyFields;
    const fieldsWithUsers = this.setUsersForStudyfields(fields, this.props.Users);
    // console.log(fields)
    // console.log(fieldsWithUsers)
    this.setState({
      StudyFields: fieldsWithUsers,
    });
  }

  componentWillUnmount() {
    Validate.unsubscribe("sl");
  }

  componentWillReceiveProps(newProps) {
    if (this.props.StudyFields !== newProps.StudyFields && this.props.Users !== newProps.Users) {
      const fields = newProps.StudyFields;
      const fieldsWithUsers = this.setUsersForStudyfields(fields, newProps.Users);
      this.setState({
        StudyFields: fieldsWithUsers,
      });
    }
  }

  setUsersForStudyfields(studyfields, users) {
    return studyfields.map(field => {
      field.Users = users.filter(user => {
        if (user.StudyField && user.StudyField.id === field.id) return user;
      });
      field.professor = users.find(user => {
        if (user.StudyField && user.StudyField.id === field.id && user.role === "professor") return user;
      });
      field.professor = field.professor === undefined ? "" : `${field.professor.firstname} ${field.professor.lastname}`;
      return field;
    });
  }

  handleChange(formname, field, event) {
    if (formname === "newStudyField") {
      Validate.updateForm("newStudyField", field, event.target.value);
    } else if (formname === "updateStudyField") {
      let value;
      if (field === "isActive") {
        value = !Validate.getFormField("updateStudyField", field);
      } else {
        value = event.target.value;
      }
      Validate.updateForm("updateStudyField", field, value);
    }
  }

  handleClick(type, index, event) {
    if (type === "save" && Validate.isFormValid("newStudyField")) {
      this.props.saveStudyField(this.state.newStudyField.values);
    } else if (type === "update" && this.state.updateStudyField.values.id && Validate.isFormValid("updateStudyField")) {
      this.props.updateStudyField(this.state.updateStudyField.values);
    } else if (type === "selectField") {
      Validate.replaceForm("updateStudyField", this.props.StudyFields[index]);
    }
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
                <ValidateError errors={this.state.newStudyField.errors} model="studyfield" field="name" />
              </div>
              <div className="field">
                <button className="ui primary button" onClick={this.handleClick.bind(this, "save")}>Save</button>
              </div>
            </div>
            <div className="field">
              <h2 className="ui dividing header">Update studyfield {this.state.updateStudyField.values.name}</h2>
              <div className="three fields">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Name"
                    value={this.state.updateStudyField.values.name}
                    onChange={this.handleChange.bind(this, "updateStudyField", "name")}
                  />
                  <ValidateError errors={this.state.updateStudyField.errors} model="studyfieldEdit" field="name" />
                </div>
                <div className="field">
                  <div className="ui checkbox">
                    <input
                      type="checkbox"
                      checked={this.state.updateStudyField.values.isActive ? "true" : ""}
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
              and create a new one rather than change old one's name.
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
                    <td>{item.professor}</td>
                    <td>{item.Users.length}</td>
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
