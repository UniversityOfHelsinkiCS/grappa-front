import React, { Component } from "react";

import moment from "moment";
import ValidateError from "../../ui/Error";

export class ThesisCouncilMeetingPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredMeetings: [{ id: "", content: "Select Date" }, ...this.formatMeetings(props.councilMeetings)],
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.councilMeetings) {
            const formatted = this.formatMeetings(newProps.councilMeetings);
            this.setState({ filteredMeetings: [{ id: "", content: "Select Date" }, ...formatted] });
        }
    }

    formatMeetings = (councilmeetings) => {
        const today = new Date();
        return councilmeetings.filter(meeting => {
            const mdate = new Date(meeting.instructorDeadline);
            if (mdate >= today || mdate.toDateString() === today.toDateString()) {
                return meeting;
            }
        }).map(meeting => {
            return {
                id: meeting.id,
                content: `${moment(new Date(meeting.date)).format("DD/MM/YYYY")} Deadline: ${moment(new Date(meeting.instructorDeadline)).format("HH:mm DD/MM/YYYY")}`,
            };
        });
    }

    chooseMeeting = (e) => {
        const chosenMeetingId = e.target.value;
        if (chosenMeetingId) {
            this.props.sendChange("CouncilMeetingId", chosenMeetingId);
        }
    }

    render() {
        return (
            <div className="m-bot">
                <h3 className="ui dividing header">Choose the Councilmeeting date</h3>
                <p>
                    Deadline tells when Grappa stops accepting new theses for that date. If the deadline has passed
                    you have to either contact admin or submit thesis to another Councilmeeting.
                </p>
                <select className="ui fluid search dropdown"
                    onChange={this.chooseMeeting}
                    value={this.props.chosenMeetingId}
                    disabled={this.props.editing ? "" : "true"}
                >
                    {this.state.filteredMeetings.map((meeting, index) =>
                        <option key={index} value={meeting.id} >
                            {meeting.content}
                        </option>
                    )}
                </select>
                <ValidateError errors={this.props.errors} model="thesis" field="CouncilMeetingId" />
            </div>
        );
    }
}
export default ThesisCouncilMeetingPicker;