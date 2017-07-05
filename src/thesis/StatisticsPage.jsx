import React, { Component } from "react";

import StatisticsTable from "./statistics/StatisticsTable";

export class StatisticsPage extends Component { 
    render() {
        return (
            <div>
            <StatisticsTable />
            <StatisticsTable />
            </div>
        );
    }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(StatisticsPage);