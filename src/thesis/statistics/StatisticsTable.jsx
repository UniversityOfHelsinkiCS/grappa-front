import React, { Component } from "react";

/**
 * StatisticsTable splits group of theses into tables and displays them.
 */
export class StatisticsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: [],
            filteredGradeTable: [],
        };
    }

    componentWillMount() {
        this.filterThesesByProgrammeAndGrade(this.props.theses);
    }


    filterThesesByProgrammeAndGrade(theses) {
        let filteredGradeTable = [];
        theses.forEach(thesis => {
            this.findAndAddProgramme(thesis, filteredGradeTable);
        });
        this.sortGradeTableForView(filteredGradeTable);
        this.setState({ filteredGradeTable });
    }

    findAndAddProgramme(thesis, filteredGradeTable) {
        let foundProgramme = false;
        filteredGradeTable.forEach(programmeObject => {
            if (programmeObject.name === thesis.StudyField.name) {
                foundProgramme = true;
                this.findAndAddGrade(thesis.grade, programmeObject);
            }
        });
        if (!foundProgramme) {
            let programmeObject = { name: thesis.StudyField.name, grades: [] }
            this.findAndAddGrade(thesis.grade, programmeObject);
            filteredGradeTable.push(programmeObject);
        }
    }

    findAndAddGrade(gradeName, programmeObject) {
        let foundGrade = false;
        programmeObject.grades.forEach(existingGrade => {
            if (existingGrade.gradeName === gradeName) {
                foundGrade = true;
                existingGrade.sum++;
            }
        });
        if (!foundGrade) {
            programmeObject.grades.push({
                gradeName: gradeName,
                sum: 1,
            });
            if (this.state.grades.indexOf(gradeName) === -1) {
                this.state.grades.push(gradeName);
            }
        }
    }

    sortGradeTableForView(filteredGradeTable) {
        filteredGradeTable.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            } else {
                return -1;
            }
        })
        this.state.grades.sort((a, b) => this.oldGradingSort(a, b));
        filteredGradeTable.forEach(programme => {
            this.addMissingGradesAndSort(programme.grades)
        });
    }

    addMissingGradesAndSort(gradesArray) {
        this.state.grades.forEach(tableGrade => {
            let found = false;
            gradesArray.forEach(grade => {
                if (tableGrade === grade.gradeName) {
                    found = true;
                }
            })
            if (!found) {
                gradesArray.push({gradeName: tableGrade, sum: 0});
            }
        });
        gradesArray.sort((a, b) => {
            return (this.oldGradingSort(a.gradeName,b.gradeName));
        });
    }

    oldGradingSort(a, b) {
        let oldGrades = ["Laudatur",
            "Eximia Cum Laude Approbatur", "Magna Cum Laude Approbatur",
            "Cum Laude Approbatur", "Non Sine Laude Approbatur", "Lubenter Approbatur", "Approbatur",]
        if (oldGrades.indexOf(a) === -1 || oldGrades.indexOf(b) === -1) {
            return a-b;
        }
        return oldGrades.indexOf(a) - oldGrades.indexOf(b);
    }

    render() {
        return (
            <table className="ui definition table">
                <thead>
                    <tr>
                        <th></th>
                        {this.state.grades.map((grade,index) => {
                            return <th key={index}>{grade}</th>;
                        })}
                        
                    </tr>
                </thead>
                <tbody>
                    {this.state.filteredGradeTable.map((programme, index) => {
                        return (<tr key={index}>
                            <td>{programme.name}</td>
                            {programme.grades.map((grade, index2) => {
                                return (<td key={index2}>{grade.sum}</td>);
                            })}
                        </tr>);
                    })}
                </tbody>
            </table>
        );
    }
}

export default StatisticsTable;