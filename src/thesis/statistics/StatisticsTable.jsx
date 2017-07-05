import React, { Component } from "react";

export class StatisticsTable extends Component {
    render() {
        return (
            <div>
            <p>Statistics</p>
            </div>
        );
    }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(StatisticsTable);