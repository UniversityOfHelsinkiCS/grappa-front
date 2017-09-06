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

  componentDidMount() {
    Validate.subscribeToForm("newStudyField", "sl", (newStudyfield) => { this.setState({ newStudyfield, }); });
    Validate.subscribeToForm("updateStudyField", "sl", (updateStudyfield) => { this.setState({ updateStudyfield, }); });
    const fieldsWithUsers = this.setUsersForStudyfields(this.props.Studyfields, this.props.Users);
    this.setState({ studyfields: fieldsWithUsers });
  }

  componentWillUnmount() {
    Validate.unsubscribe("sl");
  }

  componentWillReceiveProps(newProps) {
    if (this.props.Studyfields !== newProps.Studyfields && this.props.Users !== newProps.Users) {
      const fieldsWithUsers = this.setUsersForStudyfields(newProps.Studyfields, newProps.Users);
      this.setState({ studyfields: fieldsWithUsers });
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
      this.props.saveStudyfield(this.state.newStudyfield.values);
    }
  }

  updateStudyfield = () => {
    if (this.state.updateStudyfield.values.id && Validate.isFormValid("updateStudyField")) {
      this.props.updateStudyfield(this.state.updateStudyfield.values);
    }
  }

  deleteStudyfield = () => {
    if (this.props.user.role === "admin") {
      this.props.deleteStudyfield(this.state.updateStudyfield.values.id);
    }
  }

  selectStudyfield = (studyfield) => {
    Validate.replaceForm("updateStudyField", studyfield)
  }

  render() {
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
                sendDelete={this.deleteStudyfield}
                sendUpdate={this.updateStudyfield}
                sendChange={this.changeStudyfieldName("updateStudyField")}
                studyfield={this.state.updateStudyfield.values}
                errors={this.state.updateStudyfield.errors}
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
import { getStudyfields, saveStudyfield, updateStudyfield, deleteStudyfield } from "./studyfield.actions";

const mapStateToProps = (state) => {
  const auth = state.get("auth");  
  const studyfield_r = state.get("studyfield");
  const user_r = state.get("user");
  return {
    user: auth.get("user").toJS(),
    Studyfields: studyfield_r.get("studyfields").toJS(),
    Users: user_r.get("users").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStudyfields() {
    dispatch(getStudyfields());
  },
  saveStudyfield(data) {
    dispatch(saveStudyfield(data));
  },
  updateStudyfield(data) {
    dispatch(updateStudyfield(data));
  },
  deleteStudyfield(id) {
    dispatch(deleteStudyfield(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyfieldListPage);
