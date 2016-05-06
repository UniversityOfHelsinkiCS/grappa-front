import React, { Component } from "react";

export class UserShow extends Component {
  constructor() {
    super();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="ui list">
        <div className="item">
          <i className="user icon"></i>
          <div className="content">
            { user.name }
          </div>
        </div>
        <div className="item">
          <i className="mail icon"></i>
          <div className="content">
            { user.email }
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  return {
    user: auth.get("user").toJS(),
  };
};

export default connect(mapStateToProps)(UserShow);
