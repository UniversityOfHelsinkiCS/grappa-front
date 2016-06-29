import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";
import moment from "moment";
import ThesesList from "../thesis/ThesisList.component";

export class CouncilmeetingShow extends Component {
  constructor() {
    super();
    this.state = {
      currentMeeting: {},
      filteredTheses: [],
    };
  }

  componentWillMount() {
    const currentMeeting = this.findCMFromProps(this.props);
    const filteredTheses = this.filterThesesByMeeting(this.props.theses, currentMeeting);
    this.setState({
      currentMeeting,
      filteredTheses,
    });
  }

  componentWillReceiveProps(newProps) {
    this.findCMFromProps(newProps);
  }

  filterThesesByMeeting(theses, meeting) {
    return theses.filter(thesis => {
      if (thesis.CouncilMeetingId === meeting.id) {
        return thesis;
      }
    });
  }

  findNextMeeting(meetings) {
    const today = new Date();
    return meetings.find(meeting => {
      if (new Date(meeting.date) >= today) {
        return meeting;
      }
    });
  }

  findCMFromProps(props) {
    let foundCM;
    if (props.params.id !== "next") {
      let cmID;
      try {
        cmID = parseInt(props.params.id, 10);
      } catch (e) {
        return;
      }
      foundCM = props.councilmeetings.find(meeting => {
        if (meeting.id === cmID) {
          return meeting;
        }
      });
    } else {
      foundCM = this.findNextMeeting(props.councilmeetings);
    }
    return foundCM;
  }

  handleClick(name, event) {
    event.preventDefault();
    if (name === "download") {
      const IDs = this.state.filteredTheses.reduce((previousValue, currentValue) => {
        return [...previousValue, currentValue.id];
      }, []);
      this.props.downloadTheses(IDs);
    } else if (name === "next") {

    } else if (name === "previous") {

    }
  }

  render() {
    const columns = [
      "status",
      "firstname",
      "lastname",
      "title",
      "instructor",
      "studyfield",
      "deadline",
    ];
    return (
      <div>
        <div className="m-bot">
          <h2 className="ui dividing header">Councilmeeting of { moment(new Date(this.state.currentMeeting.date)).format("DD/MM/YYYY") }</h2>
          <button className="ui button blue" onClick={this.handleClick.bind(this, "previous")}>Previous</button>
          <button className="ui button blue" onClick={this.handleClick.bind(this, "next")}>Next</button>
          <p>Total theses: {this.state.filteredTheses.length}</p>
          <p>
            It will take approximately 1 min for 20 theses to be bundled into one
            downloadable document. Be patient. If nothing works you can manually go
            through theses in the "Theses" view and click "Download as PDF" to get single
            PDF documents.
          </p>
          <button className="ui button blue" onClick={this.handleClick.bind(this, "download")}>Download</button>
        </div>
        <ThesesList theses={this.state.filteredTheses}/>
      </div>
    );
  }
}

import { connect } from "react-redux";
import { getTheses, downloadTheses } from "../thesis/thesis.actions";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  const cm = state.get("councilmeeting");
  const thesis = state.get("thesis");
  return {
    user: auth.get("user").toJS(),
    councilmeetings: cm.get("councilmeetings").toJS(),
    theses: thesis.get("theses").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
  downloadTheses(theses) {
    dispatch(downloadTheses(theses));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CouncilmeetingShow);
