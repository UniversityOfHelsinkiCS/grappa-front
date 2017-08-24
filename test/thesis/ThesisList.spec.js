import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { theses, councilmeetings } from "../mockdata";

import ThesisList from '../../src/thesis/ThesisList';

/*
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
*/

test("renders properly without meetingcontrols", t => {
    const wrapper = shallow(
        <ThesisList theses={theses}/>
    );

    t.is(wrapper.find(".button").length, 2);

    t.is(wrapper.find("input").length, 2);
});

test("renders properly with meetingcontrols", t => {
    const wrapper = shallow(
        <ThesisList councilmeeting={councilmeetings[0]} theses={theses}/>
    );

    t.is(wrapper.find(".button").length, 2);

    t.is(wrapper.find("input").length, 3);
});


test("renders properly with meetingcontrols for admins", t => {
    const wrapper = shallow(
        <ThesisList councilmeeting={councilmeetings[0]} userRole={"admin"} theses={theses}/>
    );

    t.is(wrapper.find(".button").length, 4);

    t.is(wrapper.find("input").length, 3);
});

test("Toggle all unselected", t => {
    const wrapper = mount(
        <ThesisList theses={theses}/>
    );

    t.is(wrapper.find("button").length, 5)
    t.is(wrapper.state().selectedThesesIds.length, theses.length)
    wrapper.find("button").at(1).simulate('click');
    t.is(wrapper.state().selectedThesesIds.length, 0)
});

test("Download selected", t => {
    t.truthy(true);
});

test.todo("Include cover");

test.todo("Move to previous meeting");

test.todo("Move to next meeting");

test.todo("Search");

test.todo("Show also unfinished");