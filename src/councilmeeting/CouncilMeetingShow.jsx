import React, { Component } from "react";
import { browserHistory } from "react-router";
import { Table, Thead, Th, unsafe } from "reactable";
import moment from "moment";
import ThesisList from "../thesis/ThesisList";

export class CouncilmeetingShow extends Component {
  constructor() {
    super();
    this.state = {
      index: "",
      previousMeeting: {},
      currentMeeting: {},
      nextMeeting: {},
      theses: [],
    };
  }

  componentWillMount() {
    this.initState(this.props);
  }

  componentWillReceiveProps(newProps) {
    // if on different page reset also selected theses
    if (this.props.params.id !== newProps.params.id) {
      this.initState(newProps);
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
    const theses = currentMeeting ? this.filterThesesByMeeting(props.theses, currentMeeting) : [];
    this.setState({
      index: foundIndex,
      previousMeeting,
      currentMeeting,
      nextMeeting,
      theses,
    });
  }

  incrementIndex(forward) {
    const index = forward ? this.state.index + 1 : this.state.index - 1;
    const previousMeeting = index > 0 ? this.props.councilmeetings[index - 1] : "";
    const currentMeeting = this.props.councilmeetings[index];
    const nextMeeting = index === this.props.councilmeetings.length - 1 ? "" : this.props.councilmeetings[index + 1];
    const theses = currentMeeting ? this.filterThesesByMeeting(this.props.theses, currentMeeting) : [];
    this.setState({
      index,
      previousMeeting,
      currentMeeting,
      nextMeeting,
      theses,
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
    if (name === "previous" && this.state.previousMeeting.id !== undefined) {
      browserHistory.replace(`/councilmeeting/${this.state.previousMeeting.id}`);
      this.incrementIndex(false);
    } else if (name === "next" && this.state.nextMeeting.id !== undefined) {
      browserHistory.replace(`/councilmeeting/${this.state.nextMeeting.id}`);
      this.incrementIndex(true);
    }
  }

  moveToPreviousMeeting = (thesisIds) => {
    const meeting = this.state.previousMeeting;
    this.props.moveTheses({
      thesisIds,
      CouncilMeetingId: meeting.id || 0,
    });
  }

  moveToNextMeeting = (thesisIds) => {
    const meeting = this.state.nextMeeting;
    this.props.moveTheses({
      thesisIds,
      CouncilMeetingId: meeting.id || 0,
    });
  }

  handleChange(name, event) {
    if (name === "toggleIncludeCover") {
      this.setState({
        includeCover: event.target.checked,
      });
    }
  }

  sendRegisterRequest = (thesisId) => {
    //Since updateThesis wants form
    const form = new FormData();
    const found = this.props.theses.find(arrThesis => (arrThesis.id == thesisId))
    found.regreq = !found.regreq;
    form.append("json", JSON.stringify(found));
    this.props.updateThesis(thesisId, form);
  }

  handleSendRegistrationEmail = (thesisId) => {
    this.props.sendReminder(thesisId, "StudentRegistrationNotification");
  }

  handleDownloadTheses = (thesisIds, includeCover) => {
    this.props.downloadTheses({
      thesisIds,
      CouncilMeetingId: includeCover ? this.state.currentMeeting.id : undefined,
    });
  }

  render() {
    const { includeCover } = this.state;
    const { role } = this.props.user;
    return (
      <div>
        <div className="m-bot">
          {this.state.previousMeeting.date !== undefined ?
            <button className="ui button blue" onClick={this.handleClick.bind(this, "previous")}>Previous</button>
            :
            <span></span>
          }
          {this.state.nextMeeting.date !== undefined ?
            <button className="ui button blue" onClick={this.handleClick.bind(this, "next")}>Next</button>
            :
            <span></span>
          }
          <h2 className="ui dividing header" style={{ "marginTop": "10px" }}>
            {this.state.currentMeeting !== undefined ?
              <span>
                Councilmeeting of {moment(new Date(this.state.currentMeeting.date)).format("DD/MM/YYYY")}
              </span>
              :
              <span>
                No Councilmeeting found
              </span>
            }
          </h2>
        </div>
        <ThesisList
          theses={this.state.theses}
          userRole={this.props.user.role}
          councilmeeting={this.state.currentMeeting.id}
          toggleRegisterRequest={this.sendRegisterRequest}
          sendRegistrationEmail={this.handleSendRegistrationEmail}
          sendDownloadTheses={this.handleDownloadTheses}
          moveToPreviousMeeting={this.moveToPreviousMeeting}
          moveToNextMeeting={this.moveToNextMeeting}
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
