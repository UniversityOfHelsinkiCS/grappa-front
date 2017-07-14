import React, { Component } from "react";

import moment from "moment";
import ValidateError from "../../ui/Error";

export class ThesisCouncilMeetingPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredMeetings: [],
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.councilMeetings) {
            const today = new Date();
            const formatted = this.props.councilMeetings.filter(meeting => {
                const mdate = new Date(meeting.date);
                if (mdate >= today || mdate.toDateString() === today.toDateString()) {
                    return meeting;
                }
            }).map(meeting => {
                return {
                    id: meeting.id,
                    content: `${moment(new Date(meeting.date)).format("DD/MM/YYYY")} Deadline: ${moment(new Date(meeting.instructorDeadline)).format("HH:mm DD/MM/YYYY")}`,
                };
            });
            this.setState({ filteredMeetings: [{ id: "", content: "Select Date" }, ...formatted]});
        }
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
                    onChange={this.chooseMeeting}>
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