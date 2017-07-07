import React, { Component } from "react";

import StatisticsTable from "./StatisticsTable";

/**
 * StatisticsYearElement contains tables for new and old system.
 * Old system has grades from laudatur to approbatur and the new system from 1-5 and
 * those are split to different tables.
 */
export class StatisticsYearElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredTheses: [],
            year: null,
        };
    }

    componentWillMount() {
        this.setYear(this.props.theses);
        this.filterThesesByGradingSystem(this.props.theses);
        
    }

    setYear(theses) {
        if (theses) {
            this.state.year = theses[0].CouncilMeeting.date.slice(0,4);
        }
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
                <h2>{this.state.year}</h2>
                {this.state.filteredTheses.map((theses, index) => {
                    if (theses.length > 0) {
                        return <StatisticsTable key={index} theses={theses} />;
                    }
                })}
                <br/>
            </div>
        );
    }
}

export default StatisticsYearElement;