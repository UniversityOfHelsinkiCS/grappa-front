import React, { Component } from "react";

import StatisticsYearElement from "./statistics/StatisticsYearElement";

export class StatisticsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredTheses: [],
        };
    }

    componentWillMount() {
        this.props.getGrades();
        this.filterThesesByYear(this.props.theses);
    }

    filterThesesByYear(theses) {
        var filteredTheses = [];
        if (theses) {
            theses.forEach(thesis => {
                let found = false;
                let year = thesis.CouncilMeeting.date.slice(0, 4);
                filteredTheses.forEach(yearlyArray => {
                    if (yearlyArray[0].CouncilMeeting.date.startsWith(year)) {
                        found = true;
                        yearlyArray.push(thesis);
                    }
                });
                if (!found) {
                    filteredTheses.push([thesis]);
                }
            });
        }
        //The order is "reversed" because the newest will be highest.
        filteredTheses.sort((a, b) => {
            let aYear = parseInt(a[0].CouncilMeeting.date.slice(0, 4));
            let bYear = parseInt(b[0].CouncilMeeting.date.slice(0, 4));
            if (aYear > bYear) {
                return -1;
            } else if (aYear < bYear) {
                return 1;
            } else {
                return 0;
            }
        });

        this.setState({ filteredTheses });
    }

    render() {
        return (
            <div>
                {this.state.filteredTheses.map((thesesByYear, index) =>
                    <StatisticsYearElement key={index} theses={thesesByYear} />
                )}
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