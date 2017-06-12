import React, { Component } from "react";
import { browserHistory } from "react-router";
import { Table, Thead, Th, unsafe } from "reactable";
import moment from "moment";
import ThesisListElement from "../thesis/ThesisListElement";

export class CouncilmeetingShow extends Component {
  constructor() {
    super();
    this.state = {
      index: "",
      includeCover: true,
      previousMeeting: {},
      currentMeeting: {},
      nextMeeting: {},
      filteredTheses: [],
      selectedTheses: [],
      searchedTheses: [],
    };
  }

  componentWillMount() {
    this.initState(this.props);
    this.setState({
      selectedTheses: [],
      searchedTheses: [],
    });
  }

  componentWillReceiveProps(newProps) {
    // if on different page reset also selected theses
    if (this.props.params.id !== newProps.params.id) {
      this.initState(newProps);
      this.setState({
        selectedTheses: [],
        searchedTheses: [],
      });
    } else {
    // have to sort stuff as it is always in disorder
      const currentTheses = this.props.theses.sort((a, b) => a.id - b.id)
      const newTheses = newProps.theses.sort((a, b) => a.id - b.id)
      if (!_.isEqual(currentTheses, newTheses)) {
        this.initState(newProps);
      }
    }
  }

  initState(props) {
    const foundIndex = this.findIndexFromProps(props);
    const previousMeeting = foundIndex > 0 ? props.councilmeetings[foundIndex - 1] : "";
    const currentMeeting = props.councilmeetings[foundIndex];
    const nextMeeting = foundIndex === props.councilmeetings.length - 1 ? "" : props.councilmeetings[foundIndex + 1];
    const filteredTheses = currentMeeting ? this.filterThesesByMeeting(props.theses, currentMeeting) : [];
    this.setState({
      index: foundIndex,
      previousMeeting,
      currentMeeting,
      nextMeeting,
      filteredTheses,
    });
  }

  incrementIndex(forward) {
    const index = forward ? this.state.index + 1 : this.state.index - 1;
    const previousMeeting = index > 0 ? this.props.councilmeetings[index - 1] : "";
    const currentMeeting = this.props.councilmeetings[index];
    const nextMeeting = index === this.props.councilmeetings.length - 1 ? "" : this.props.councilmeetings[index + 1];
    const filteredTheses = currentMeeting ? this.filterThesesByMeeting(this.props.theses, currentMeeting) : [];
    this.setState({
      index,
      previousMeeting,
      currentMeeting,
      nextMeeting,
      filteredTheses,
      selectedTheses: [],
      searchedTheses: [],
    });
  }

  filterThesesByMeeting(theses, meeting) {
    return theses.filter(thesis => {
      if (thesis.CouncilMeetingId === meeting.id) {
        return thesis;
      }
    });
  }

  findIndexFromProps(props) {
    let foundIndex;
    if (props.params.id !== "next") {
      let cmID;
      try {
        cmID = parseInt(props.params.id, 10);
      } catch (e) {
        return;
      }
      foundIndex = props.councilmeetings.findIndex(meeting => {
        if (meeting.id === cmID) {
          return meeting;
        }
      });
    } else {
      foundIndex = this.findNextMeeting(new Date(), props.councilmeetings);
    }
    return foundIndex;
  }

  /**
   * Finds the index of closest date including today from sorted list of CouncilMeetings
   */
  findNextMeeting(starting, meetings) {
    return meetings.findIndex(meeting => {
      const date = new Date(meeting.date);
      if (date >= starting || date.toDateString() === starting.toDateString()) {
        return meeting;
      }
    });
  }

  handleClick(name, event) {
    event.preventDefault();
    if (name === "download") {
      const IDs = this.state.filteredTheses.reduce((previousValue, currentValue, index) => {
        if (this.state.selectedTheses[index] && this.state.searchedTheses[index]) {
          return [...previousValue, currentValue.id];
        }
        return previousValue;
      }, []);
      this.props.downloadTheses({
        thesisIds: IDs,
        CouncilMeetingId: this.state.includeCover ? this.state.currentMeeting.id : undefined,
      });
    } else if (name === "previous" && this.state.previousMeeting.id !== undefined) {
      browserHistory.replace(`/councilmeeting/${this.state.previousMeeting.id}`);
      this.incrementIndex(false);
    } else if (name === "next" && this.state.nextMeeting.id !== undefined) {
      browserHistory.replace(`/councilmeeting/${this.state.nextMeeting.id}`);
      this.incrementIndex(true);
    } else if (name === "moveNext" || name === "movePrevious") {
      const IDs = this.state.filteredTheses.reduce((previousValue, currentValue, index) => {
        if (this.state.selectedTheses[index] && this.state.searchedTheses[index]) {
          return [...previousValue, currentValue.id];
        }
        return previousValue;
      }, []);
      const meeting = name === "moveNext" ? this.state.nextMeeting : this.state.previousMeeting;
      this.props.moveTheses({
        thesisIds: IDs,
        CouncilMeetingId: meeting.id || 0,
      });
    }
  }

  handleChange(name, event) {
    if (name === "toggleIncludeCover") {
      this.setState({
        includeCover: event.target.checked,
      });
    }
  }

  sendRegisterRequest = (thesis) => {
    //Shouldn't be null, but just in case.
    if (thesis.regreq) {
      thesis.regreq = !thesis.regreq;
    } else {
      thesis.regreq = true;
    }
    //Since updateThesis wants form
    const form = new FormData();
    const found = this.props.theses.find(arrThesis => (arrThesis.id == thesis.id))
    console.log(found);
    found.regreq = thesis.regreq;
    form.append("json", JSON.stringify(found));
    this.props.updateThesis(thesis.id, form);
  }

  handleSendRegistrationEmail = (thesis) => {
    thesis.notificationSent = true;
    this.props.sendReminder(thesis.id, "studentRegistrationNotification");
    
    //This must be refactored.
    const form = new FormData();
    const found = this.props.theses.find(arrThesis => (arrThesis.id == thesis.id))
    console.log(found);
    found.notificationSent = thesis.notificationSent;
    form.append("json", JSON.stringify(found));
    this.props.updateThesis(thesis.id, form);
  }

  render() {
    const { includeCover } = this.state;
    const { role } = this.props.user;
    return (
      <div>
        <div className="m-bot">
          { this.state.previousMeeting.date !== undefined ?
            <button className="ui button blue" onClick={this.handleClick.bind(this, "previous")}>Previous</button>
              :
            <span></span>
          }
          { this.state.nextMeeting.date !== undefined ?
            <button className="ui button blue" onClick={this.handleClick.bind(this, "next")}>Next</button>
              :
            <span></span>
          }
          <h2 className="ui dividing header" style={{ "marginTop": "10px" }}>
            { this.state.currentMeeting !== undefined ?
              <span>
                Councilmeeting of { moment(new Date(this.state.currentMeeting.date)).format("DD/MM/YYYY") }
              </span>
              :
              <span>
                No Councilmeeting found
              </span>
            }
          </h2>

          <p>
            Checking "Include cover" -box will add a councilmeeting cover for the theses that is required for the meeting.
            Moving theses will set their councilmeeting to next or previous one.
          </p>
          <div>
            <button className="ui violet button" onClick={this.handleClick.bind(this, "download")}>Download selected</button>
            <div className="ui checkbox m-left m-right">
              <input
                type="checkbox"
                checked={includeCover ? "true" : ""}
                onChange={this.handleChange.bind(this, "toggleIncludeCover")}
              />
              <label>Include cover</label>
            </div>
            { role === "admin" ?
              <span>
                <button className="ui orange button" onClick={this.handleClick.bind(this, "movePrevious")}>Move to previous meeting</button>
                <button className="ui dark-red button" onClick={this.handleClick.bind(this, "moveNext")}>Move to next meeting</button>
              </span>
                :
              <span></span>
            }
          </div>
        </div>
        <ThesisListElement 
          theses={this.state.filteredTheses} 
          selected={this.state.selectedTheses}
          searched={this.state.searchedTheses}
          toggleRegisterRequest={this.sendRegisterRequest}
          sendRegistrationEmail={this.handleSendRegistrationEmail}
        />
      </div>
    );
  }
}

import { connect } from "react-redux";
import { updateThesis, getTheses, downloadTheses, moveTheses } from "../thesis/thesis.actions";
import { sendReminder } from "../email/email.actions";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  const cm_r = state.get("councilmeeting");
  const thesis = state.get("thesis");
  return {
    user: auth.get("user").toJS(),
    councilmeetings: cm_r.get("councilmeetings").toJS(),
    theses: thesis.get("theses").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateThesis(id, thesis) {
    dispatch(updateThesis(id, thesis));
  },
  sendReminder(thesisId, type) {
    dispatch(sendReminder(thesisId, type));
  },
  getTheses() {
    dispatch(getTheses());
  },
  downloadTheses(theses) {
    dispatch(downloadTheses(theses));
  },
  moveTheses(data) {
    dispatch(moveTheses(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CouncilmeetingShow);
