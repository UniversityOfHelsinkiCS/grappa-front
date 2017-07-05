import React, { Component } from "react";

import StatisticsTable from "./statistics/StatisticsTable";

export class StatisticsPage extends Component {

    constructor(props) {
        super(props);
        this.state = { theses: [] };
    }

    componentWillMount() {
        this.props.getGrades(),
        this.setState({
            theses: this.props.theses,
        });
    }


    render() {
        const grades = [1, 2, 3, 4, 5];
        const grades2 = ['A', 'B', 'C', 'D', 'E'];
        const programmes = ["Software Systems"];
        const programmes2 = ["Software Systems", "Networking and Services", "Algorithms, Data Analytics and Machine Learning", "Algorithmic Bioinformatics"];
        const grades3 = [];
        const programmes3 = [];
        return (
            <div>
                <StatisticsTable columnDefinition={grades} rowDefinition={programmes} theses={filteredTheses} />
            </div>
        );
    }
}

import { connect } from "react-redux";
import { getGrades } from "../thesis/thesis.actions";


const mapStateToProps = (state) => {
    const thesis = state.get("thesis");
    return {
        theses: thesis.get("theses").toJS(),
    };
};

const mapDispatchToProps = (dispatch) => ({
    getGrades() {
        dispatch(getGrades());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);