import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";
import moment from "moment";
import ThesesList from "../thesis/ThesisList.component";

export class CouncilmeetingShow extends Component {
  constructor() {
    super();
    this.handleDownload= this.handleDownload.bind(this);
    this.state = {
      nextMeeting: {},
      filteredTheses: [],
    };
  }

  componentWillMount() {
    // console.log(this.props)
    // console.log(this.props.councilmeetings)
    // this.findCMFromProps(this.props);
    const nextMeeting = this.findNextMeeting(this.props.councilmeetings);
    const filteredTheses = this.filterThesesByMeeting(this.props.theses, nextMeeting);
    // console.log(nextMeeting)
    // console.log(filteredTheses)
    this.setState({
      nextMeeting,
      filteredTheses,
    });
  }

  // componentWillReceiveProps(newProps) {
  //   this.findCMFromProps(newProps);
  // }

  findCMFromProps(props) {
    let thesisId;
    try {
      thesisId = parseInt(props.params.id, 10);
    } catch (e) {
      return;
    }
    const foundThesis = props.theses.find(thesis => {
      if (thesis.id === thesisId) {
        console.log(thesis);
        return thesis;
      }
    });
    if (typeof foundThesis !== "undefined") {
      console.log(foundThesis);
      this.setState({
        thesis: foundThesis,
      });
    }
  }

  filterThesesByMeeting(theses, meeting) {
    return theses.filter(thesis => {
      if (thesis.CouncilMeetingId === meeting.id) {
        return thesis;
      }
    })
  }

  findNextMeeting(meetings) {
    const today = new Date();
    return meetings.find(meeting => {
      if (new Date(meeting.date) >= today) {
        return meeting;
      }
    });
  }

  handleDownload(event) {
    event.preventDefault();
    console.log("lataan kaiken!")
    const IDs = this.state.filteredTheses.reduce((previousValue, currentValue) => {
      return [...previousValue, currentValue.id];
    }, [])
    this.props.downloadTheses(IDs);
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
          <h2 className="ui dividing header">Councilmeeting of { moment(new Date(this.state.nextMeeting.date)).format("DD/MM/YYYY") }</h2>
          <p>Total theses: 22</p>
          <p>
            It will take approximately 1 min for 20 theses to be bundled into one
            downloadable document. Be patient. If nothing works you can manually go
            through theses in the "Theses" view and click "Download as PDF" to get single
            PDF documents.
          </p>
          <button className="ui button blue" onClick={this.handleDownload}>Download</button>
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
  console.log(cm.get("councilmeetings").toJS())
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
