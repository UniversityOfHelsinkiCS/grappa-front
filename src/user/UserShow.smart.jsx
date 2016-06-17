import React, { Component } from "react";

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
    })
    return (
      <table className="ui table">
        <tbody>
          <tr>
            <td>
              <i className="user icon"></i>
            </td>
            <td>{ user.name }</td>
          </tr>
          <tr>
            <td>
              <i className="mail icon"></i>
            </td>
            <td>{ user.email }</td>
          </tr>
          <tr>
            <td>
              <i className="student icon"></i>
            </td>
            <td>{ StudyField.name }</td>
          </tr>
        </tbody>
      </table>
    );
  }
      //   <div className="ui list">
      //   <div className="item">
          
      //     <div className="content">
            
      //     </div>
      //   </div>
      //   <div className="item">
          
      //     <div className="content">
            
      //     </div>
      //   </div>
      //   <div className="item">
          
      //     <div className="content">
            
      //     </div>
      //   </div>
      // </div>
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
