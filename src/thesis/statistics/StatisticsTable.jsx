import React, { Component } from "react";

export class StatisticsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredTheses: [],
        };
    }

    componentWillMount() {
        this.filterThesesByProgrammeAndGrade(this.props.theses);
    }

    //TODO: Sort by grades
    //
    filterThesesByProgrammeAndGrade() {
        
    }

    render() {
        return (
            <table className="ui fixed definition table">
                <thead>
                    <tr>
                        <th></th>
                        <th>NaN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sum</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(StatisticsTable);