import React, { Component } from "react";

export class StatisticsTable extends Component {
    render() {
        if (this.props.rowDefinition.length <= 0 || this.props.columnDefinition.length <= 0) {
            return (<div/>);
        }
        return (
            <table className="ui fixed definition table">
                <thead>
                    <tr>
                        <th></th>
                        {this.props.columnDefinition.map((value, key) =>
                            <th key={key}>{value}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {this.props.rowDefinition.map((value, key) =>
                    <tr key={key}>
                        <td>{value}</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                    </tr>
                    )}
                    <tr>
                        <td>Sum</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                    </tr>
                </tbody></table>
        );
    }
}

import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(StatisticsTable);