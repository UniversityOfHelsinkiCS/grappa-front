import React, { Component } from "react";
// import Authenticated from "../app/Authenticated.component.js";

export class UserShow extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>hei olen user</p>
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
