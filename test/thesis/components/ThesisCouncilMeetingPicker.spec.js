import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { councilmeetings } from "../../mockdata";

import ThesisCouncilMeetingPicker from '../../../src/thesis/components/ThesisCouncilMeetingPicker';

test("renders properly", t => {
    const wrapper = mount(
        <ThesisCouncilMeetingPicker councilMeetings={[]} errors={() => {}}/>
    );

    t.is(councilmeetings.length, 4);
    t.is(wrapper.find("select").length, 1);
    t.is(wrapper.find("option").length, 1);
});

test("renders properly", t => {
    const wrapper = mount(
        <ThesisCouncilMeetingPicker councilMeetings={councilmeetings} errors={() => {}}/>
    );

    t.is(councilmeetings.length, 4);
    t.is(wrapper.find("select").length, 1);
    t.is(wrapper.find("option").length, 3);
});

test("sends chosen councilmeeting", t => {
    const changeStub = sinon.stub();
    const wrapper = mount(
        <ThesisCouncilMeetingPicker sendChange={changeStub} councilMeetings={councilmeetings} errors={() => {}}/>        
    );
    t.truthy(changeStub.notCalled);
    wrapper.find("option").at(1).simulate('change');
    t.truthy(changeStub.calledOnce);
    t.truthy(changeStub.calledWith( "CouncilMeetingId", "1" ));
})