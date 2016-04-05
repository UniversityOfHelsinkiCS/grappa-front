import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

export default class App extends Component {

  render() {
    return (
      <div>
        <h1>Hei olen App komponentti, minun sisälläni on kaikki!</h1>
        <Link to="/theses">ThesesList </Link>
        <Link to="/theses/1"> | ThesesShow </Link>
        <Link to="/councilmeetings"> | Councilmeetings </Link>
        <Link to="/councilmeeting/new"> | Add new meetingdate</Link>

        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

// import { connect } from "react-redux";

// export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect()(App);
