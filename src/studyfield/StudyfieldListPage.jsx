import React, { Component } from "react";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error";

import StudyfieldList from "./components/StudyfieldList";
import StudyfieldCreate from "./components/StudyfieldCreate";
import StudyfieldEdit from "./components/StudyfieldEdit";

export class StudyfieldListPage extends Component {

  constructor() {
    super();
    this.state = {
      studyfields: [],
      newStudyfield: Validate.createForm("newStudyField", "studyfield"),
      updateStudyfield: Validate.createForm("updateStudyField", "studyfieldEdit"),
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("newStudyField", "sl", (newStudyfield) => { this.setState({ newStudyfield, }); });
    Validate.subscribeToForm("updateStudyField", "sl", (updateStudyfield) => { this.setState({ updateStudyfield, }); });
    const fields = this.props.Studyfields;
    const fieldsWithUsers = this.setUsersForStudyfields(fields, this.props.Users);
    this.setState({
      studyfields: fieldsWithUsers,
    });
  }

  componentWillUnmount() {
    Validate.unsubscribe("sl");
  }

  componentWillReceiveProps(newProps) {
    if (this.props.StudyFields !== newProps.StudyFields && this.props.Users !== newProps.Users) {
      const fields = newProps.Studyfields;
      const fieldsWithUsers = this.setUsersForStudyfields(fields, newProps.Users);
      this.setState({
        studyfields: fieldsWithUsers,
      });
    }
  }

  setUsersForStudyfields(studyfields, users) {
    return studyfields.map(field => {
      field.Users = users.filter(user => user.StudyFieldId && parseInt(user.StudyFieldId) === field.id);
      field.professor = users.find(user => user.StudyFieldId && parseInt(user.StudyFieldId) === field.id && user.role === "professor");
      field.professor = field.professor === undefined ? "" : `${field.professor.firstname} ${field.professor.lastname}`;
      return field;
    });
  }

  toggleStudyfield = () => {
    const field = "isActive";
    const value = !Validate.getFormField("updateStudyField", field);
    Validate.updateForm("updateStudyField", field, value);
  }

  changeStudyfieldName = (formname) => (value) => {
    Validate.updateForm(formname, "name", value);
  }

  saveStudyfield = () => {
    if (Validate.isFormValid("newStudyField")) {
      this.props.saveStudyField(this.state.newStudyfield.values);
    }
  }

  updateStudyfield = () => {
    if (this.state.updateStudyfield.values.id && Validate.isFormValid("updateStudyField")) {
      this.props.updateStudyField(this.state.updateStudyfield.values);
    }
  }

  selectStudyfield = (studyfield) => {
    Validate.replaceForm("updateStudyField", studyfield)
  }

  render() {
    console.log(this.props.Studyfields);
    return (
      <div className="ui form">
        <div className="ui two fields">
          <div className="field">
            <StudyfieldCreate
              sendSave={this.saveStudyfield}
              sendChange={this.changeStudyfieldName("newStudyField")}
              errors={this.state.newStudyfield.errors}
            />
            {this.state.updateStudyfield.values.id ?
            <StudyfieldEdit
              toggleActive={this.toggleStudyfield}
              sendUpdate={this.updateStudyfield}
              sendChange={this.changeStudyfieldName("updateStudyField")}
              studyfield={this.state.updateStudyfield.values}
              updateStudyfieldErrors={this.state.updateStudyfield.errors}
            /> : ''}
          </div>
          <div className="field">
            <h2 className="ui dividing header">Studyfields</h2>
            <p>
              All old and current studyfields. Press a studyfield to start editing it. Note that changing studyfield's
              name changes it for every thesis connected to that field. If a field is no longer valid set it inactive
              and create a new one rather than change old one's name.
            </p>
            <StudyfieldList 
              selectField={this.selectStudyfield}
              studyfields={this.state.studyfields}
            />
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
    Studyfields: studyfield_r.get("studyfields").toJS(),
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

export default connect(mapStateToProps, mapDispatchToProps)(StudyfieldListPage);
