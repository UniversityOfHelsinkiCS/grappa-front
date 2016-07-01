import React, { Component } from "react";
import Dropdown from "../ui/Dropdown.component";

export class UserShow extends Component {
  constructor() {
    super();
  }

  render() {
    const { user } = this.props;
    const StudyField = this.props.studyfields.find(field => {
      if (field.id === user.StudyFieldId) {
        return field;
      }
    });
    return (
      <div className="ui list">
        <div>
          <i className="user icon"></i>
          <span>
            { user.name }
          </span>
        </div>
        <div>
          <i className="mail icon"></i>
          <span>
            { user.email }
          </span>
        </div>
        <div>
          <i className="student icon"></i>
          <span>
            { StudyField === undefined ? "No studyfield assigned" : StudyField.name}
          </span>
        </div>
        <div className="ui sub header">Multiple</div>
        <div className="ui fluid multiple search selection dropdown">
          <input name="tags" type="hidden" />
          <i className="dropdown icon"></i>
          <div className="default text">Skills</div>
          <div className="menu">
            <div className="item" data-value="1">Prof. Koskela Matti</div>
            <div className="item" data-value="2">AssProf. Asdf Pena</div>
          </div>
        </div>
        <Dropdown />
      </div>
    );
  }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  const sfreducer = state.get("studyfield");
  return {
    user: auth.get("user").toJS(),
    studyfields: sfreducer.get("studyfields").toJS(),
  };
};

export default connect(mapStateToProps)(UserShow);
