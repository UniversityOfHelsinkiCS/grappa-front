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

    t.is(wrapper.state().selectedThesesIds.length, wrapper.state().shownThesesIds.length)
    wrapper.find("button").at(1).simulate('click');
    t.is(wrapper.state().selectedThesesIds.length, 0)
});

test("Download selected", t => {
    const downloadStub = sinon.stub();
    const wrapper = mount(
        <ThesisList theses={theses} sendDownloadTheses={downloadStub}/>
    );

    wrapper.find("button").at(0).simulate('click');
    t.truthy(downloadStub.calledOnce);
});

test("Include cover", t => {
    const wrapper = mount(
        <ThesisList councilmeeting={councilmeetings[0]} userRole={"admin"} theses={theses}/>
    );
    t.is(wrapper.state().includeCover, true);
    wrapper.find("input").at(0).simulate('change');
    t.is(wrapper.state().includeCover, false);
});

test("Search", t => {
    const wrapper = mount(
        <ThesisList theses={theses} />
    );
    t.is(wrapper.state().shownThesesIds.length, theses.length -1);
    wrapper.find("input").at(0).simulate('change', {target: {value: theses[0].title}});
    t.is(wrapper.state().shownThesesIds.length, 1);
    wrapper.find("input").at(0).simulate('change', {target: {value: "ka"}});
    t.is(wrapper.state().shownThesesIds.length, 2);
});

test("Show also finished theses", t => {
    const wrapper = mount(
        <ThesisList theses={theses} />
    );
    t.is(wrapper.state().shownThesesIds.length, theses.length - 1);
    t.is(wrapper.state().selectedThesesIds.length, wrapper.state().shownThesesIds.length);
    wrapper.find("input").at(1).simulate('change');
    t.is(wrapper.state().shownThesesIds.length, theses.length);
    t.is(wrapper.state().selectedThesesIds.length, wrapper.state().shownThesesIds.length - 1);

});