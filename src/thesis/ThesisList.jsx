import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router";
import _ from "lodash";
import { ThesisListElement } from "./ThesisListElement";

/**
 * Weird component that receives 3 arrays as props (thesis-objects, two booleans)
 * of which it alters the selected & searched boolean-arrays.
 * So it is a two-way binding which is kinda hard to implement in React 
 */
export default class ThesisList extends Component {
  constructor() {
    super();
    this.state = {
      shownThesesIds: [],
      selectedThesesIds: [],
      includeCover: true,
      allToggle: false,
      showOld: false,
      searchValue: "",
    };
  }

  componentDidMount() {
    this.initState(this.props);
  }

  componentWillReceiveProps(newProps) {
    // initState only when new theses have been received
    if (this.state.theses !== newProps.theses) {
      this.initState(newProps);
    }
  }

  initState(props) {
    // sort theses by lastname first then firstname
    const sorted = this.sortTheses(props.theses);

    const shownThesesIds = this.filterTheses(this.state.showOld, this.state.searchValue, props.theses);
    const selectedThesesIds = props.theses
      .filter(thesis => {
        return this.props.userRole === "print-person" ? 
        shownThesesIds.includes(thesis.id) && thesis.ThesisProgress.ethesisDone && thesis.ThesisProgress.graderEvalDone:
        shownThesesIds.includes(thesis.id) && this.inProgress(thesis)})
      .map(thesis => thesis.id);
    this.setState({ allToggle: true, selectedThesesIds, shownThesesIds });
  }

  sortTheses = (theses) => {
    return theses.sort((a, b) => {
      if (a.authorLastname < b.authorLastname) {
        return -1;
      } else if (a.authorLastname > b.authorLastname) {
        return 1;
      } else if (a.authorFirstname < b.authorFirstname) {
        return -1;
      } else if (a.authorFirstname > b.authorFirstname) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  inProgress = (thesis) => {
    return !(thesis.ThesisProgress.ethesisDone && thesis.ThesisProgress.graderEvalDone && thesis.ThesisProgress.printDone)
  }

  searchTheses = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const shownThesesIds = this.filterTheses(this.state.showOld, searchValue);
    this.setState({ searchValue, shownThesesIds });
  }

  showOldTheses = () => {
    const shownThesesIds = this.filterTheses(!this.state.showOld, this.state.searchValue);
    this.setState({ showOld: !this.state.showOld, shownThesesIds });
  }

  filterTheses = (showOld, searchValue, propTheses) => {
    if (propTheses === undefined) {
      propTheses = this.props.theses;
    }
    const thesesIds = propTheses.filter((thesis, index, array) => {
      if (this.inProgress(thesis) || (!this.inProgress(thesis) && showOld)) {
        const simplifiedThesis = {
          status: this.inProgress(thesis) ? "Done" : "In Progress",
          authorFirstname: thesis.authorFirstname,
          authorLastname: thesis.authorLastname,
          title: thesis.title,
          instructor: thesis.User.firstname + " " + thesis.User.lastname,
          studyfield: thesis.StudyField.name,
          grade: thesis.grade,
        }
        for (const key in simplifiedThesis) {
          if (simplifiedThesis.hasOwnProperty(key) && simplifiedThesis[key] && typeof simplifiedThesis[key] === "string" && simplifiedThesis[key].toLowerCase().includes(searchValue)) {
            return true;
          }
        }
      }
      return false;
    }).map(thesis => thesis.id);
    return thesesIds;
  }

  shownAndSelectedTheses = () => {
    const thesisIds = this.state.shownThesesIds.filter(id => this.state.selectedThesesIds.includes(id));
    return thesisIds;
  }

  toggleAllTheses = (selectAll, theses) => {
    if (selectAll) {
      this.setState({ selectedThesesIds: theses });
    } else {
      this.setState({ selectedThesesIds: [] });
    }
  }

  selectThesis = (thesisId) => {
    const index = this.state.selectedThesesIds.indexOf(thesisId);
    if (index > -1) {
      this.setState({
        selectedThesesIds: this.state.selectedThesesIds.filter(id => id !== thesisId)
      });
    } else {
      this.setState({ selectedThesesIds: [...this.state.selectedThesesIds, thesisId] });
    }
  }

  downloadTheses = () => {
    this.props.sendDownloadTheses(this.shownAndSelectedTheses(), this.state.includeCover);
  }

  toggleIncludeCover = () => {
    this.setState({ includeCover: !this.state.includeCover });
  }

  toggleAll = () => {
    if (this.props.userRole == "print-person") {
      const thesisIds = this.props.theses.filter(thesis => {
        if (thesis.ThesisProgress.ethesisDone && thesis.ThesisProgress.graderEvalDone) {
          return thesis;
        }
      }).map(th => th.id);
      this.toggleAllTheses(!this.state.allToggle, thesisIds);
      this.setState({ allToggle: !this.state.allToggle });
    } else {
      this.toggleAllTheses(!this.state.allToggle, this.state.shownThesesIds);
      this.setState({ allToggle: !this.state.allToggle });
    }
  }

  sendStudentNotification = (thesisId) => {
    if (this.props.userRole === "admin") {
      this.props.sendRegistrationEmail(thesisId);
    }
  }

  toggleRegistrationRequest = (thesisId) => {
    if (this.props.userRole === "admin") {
      this.props.toggleRegisterRequest(thesisId);
    }
  }

  moveToPreviousMeeting = () => {
    if (confirm("Are you sure you want to move theses to the previous meeting?")) {
      this.props.moveToPreviousMeeting(this.shownAndSelectedTheses());
    }
  }

  moveToNextMeeting = () => {
    if (confirm("Are you sure you want to move theses to next meeting?")) {
      this.props.moveToNextMeeting(this.shownAndSelectedTheses());
    }
  }

  render() {
    const theses = this.props.theses.filter(thesis => {
      return this.state.shownThesesIds.includes(thesis.id);
    });
    const inProgress = this.props.theses.filter(thesis => this.inProgress(thesis)).length;
    return (
      <div>
        {this.props.councilmeeting != null ?
          <p>
            Checking "Include cover" -box will add a councilmeeting cover for the theses that is required for the meeting.
            Moving theses will set their councilmeeting to next or previous one.
          </p>
          :
          <p></p>
        }
        <div>
          <button className="ui violet button" onClick={this.downloadTheses}>Download selected</button>
          {this.props.councilmeeting != null ?
            <div className="ui checkbox m-left m-right">
              <input
                type="checkbox"
                checked={this.state.includeCover ? "true" : ""}
                onChange={this.toggleIncludeCover}
              />
              <label>Include cover</label>
            </div>
            :
            <div></div>
          }
          {this.props.userRole === "admin" && this.props.councilmeeting ?
            <span>
              <button className="ui orange button" onClick={this.moveToPreviousMeeting}>Move selected theses to previous meeting</button>
              <button className="ui dark-red button" onClick={this.moveToNextMeeting}>Move selected theses to next meeting</button>
            </span>
            :
            <span></span>
          }

        </div>
        <p>Theses done/all theses: {this.props.theses.length - inProgress}/{this.props.theses.length}</p>
        <div className="ui middle aligned three columns grid">
          <div className="column">
            <div className="ui input" style={{ "width": "100%" }}>
              <input
                type="text"
                placeholder="Search..."
                value={this.state.searchValue}
                onChange={this.searchTheses}
              />
            </div>
          </div>
          <div className="column">
            <div className="ui right input">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  checked={this.state.showOld ? "true" : ""}
                  onChange={this.showOldTheses}
                />
                <label>Show also finished theses</label>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <button className="ui button blue" onClick={this.toggleAll}>
              Toggle all {this.state.allToggle ? "unselected" : "selected"}
            </button>
          </div>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Ethesis Done</th>
              <th>GraderEval Done</th>
              <th>Print Done</th>
              <th>Author lastname</th>
              <th>Author firstname</th>
              <th>Title</th>
              <th>Instructor</th>
              <th>Studyfield</th>
              <th>Grade</th>
              <th>Selected</th>
              {this.props.userRole === "admin" ? <th>Register request</th> : undefined}
              {this.props.userRole === "admin" ? <th>Registration Done</th> : undefined}
            </tr>
          </thead>
          <tbody>
            {theses.map((thesis, index) =>
              <ThesisListElement
                userRole={this.props.userRole}
                thesis={thesis}
                selected={this.state.selectedThesesIds.includes(thesis.id)}
                selectThesis={this.selectThesis}
                sendStudentNotification={this.sendStudentNotification}
                toggleRegistrationRequest={this.toggleRegistrationRequest}
                key={index} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}