import React, { Component } from "react";

export default class ThesisShow extends Component {

  render() {
    return (
      <div>
        <h1>Thesis show!</h1>
      </div>
    );
  }
}

// get thesis id from route params
// and fetch the thesis from store

import { connect } from "react-redux";

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect()(ThesisShow);
