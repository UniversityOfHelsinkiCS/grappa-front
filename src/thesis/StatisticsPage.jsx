import React, { Component } from "react";

import StatisticsTable from "./statistics/StatisticsTable";

export class StatisticsPage extends Component { 

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getGrades();
    }

    render() {
        const grades = [1,2,3,4,5];
        const grades2 = ['A','B','C','D','E'];
        const programmes = ["??", "??", "??"];
        const programmes2 = ["Software Systems", "Networking and Services", "Algorithms, Data Analytics and Machine Learning", "Algorithmic Bioinformatics"];
        const grades3 = [];
        const programmes3 = [];
        return (
            <div>
            <StatisticsTable columnDefinition={grades} rowDefinition={programmes}/>
            <StatisticsTable columnDefinition={grades2} rowDefinition={programmes2}/>
            <StatisticsTable columnDefinition={grades3} rowDefinition={programmes3}/>
            </div>
        );
    }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
  };
};

import { getGrades } from "../thesis/thesis.actions";

const mapDispatchToProps = (dispatch) => ({
    getGrades(){
        dispatch(getGrades());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);