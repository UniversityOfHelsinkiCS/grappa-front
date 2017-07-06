import React, { Component } from "react";

import StatisticsTable from "./StatisticsTable";

export class StatisticsYearElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredTheses: [],
        };
    }

    componentWillMount() {
        this.filterThesesByGradingSystem(this.props.theses);
    }

    filterThesesByGradingSystem(theses) {
        let filteredTheses = [[], []];
        let oldGrades = ["Laudatur",
            "Eximia Cum Laude Approbatur", "Magna Cum Laude Approbatur",
            "Cum Laude Approbatur", "Non Sine Laude Approbatur", "Lubenter Approbatur", "Approbatur",]
        if (theses) {
            theses.forEach(thesis => {
                if (oldGrades.includes(thesis.grade)) {
                    filteredTheses[1].push(thesis);
                } else {
                    filteredTheses[0].push(thesis);
                }
            });
        }
        this.setState({ filteredTheses });
    }

    render() {
        return (
            <div>
                {this.state.filteredTheses.map((theses, index) => {
                    if (theses.length > 0) {
                        return <StatisticsTable key={index} theses={theses} />;
                    }
                })}
            </div>
        );
    }
}
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(StatisticsYearElement);