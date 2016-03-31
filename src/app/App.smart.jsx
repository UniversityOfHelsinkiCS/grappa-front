<<<<<<< HEAD
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

export default class App extends Component {
=======
import React, { Component } from "react";
import ThesisList from "../thesis-list/ThesisList.smart";
// import AddThesis from "../add-thesis/AddThesis.smart";
export class App extends Component {
>>>>>>> thesislistings

  render() {
    return (
      <div>
<<<<<<< HEAD
        <h1>Hei olen App komponentti, minun sisälläni on kaikki!</h1>
        <Link to="/theses">ThesesList</Link>
        <Link to="/theses/1">ThesesShow</Link>
        {this.props.children}
        {/*<ThesisList />*/}
        {/*<ThesisShow />*/}
=======
        <ThesisList theses={these} />
>>>>>>> thesislistings
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

<<<<<<< HEAD
// import { connect } from "react-redux";

// export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect()(App);
=======
export default connect(mapStateToProps, null)(App);
>>>>>>> thesislistings
