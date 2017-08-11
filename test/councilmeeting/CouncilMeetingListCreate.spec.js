import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { councilmeetings, users, theses } from "../mockdata";

import { CouncilmeetingListCreate } from '../../src/councilmeeting/CouncilMeetingListCreate';

test('renders properly for admin', t => {
    const wrapper = shallow(
        <CouncilmeetingListCreate CouncilMeetings={councilmeetings} User={users[0]} />
    );

    //Two buttons: Submit & Update
    t.is(wrapper.find('button').length, 2);
});

test('renders properly for print-person', t => {
    const wrapper = shallow(
        <CouncilmeetingListCreate CouncilMeetings={councilmeetings} User={users[1]} />
    );

    //No buttons
    t.is(wrapper.find('button').length, 0);
});

test('Creating new councilmeeting', t => {
    const saveStub = sinon.stub();
    const wrapper = mount(
        <CouncilmeetingListCreate saveCouncilMeeting={saveStub} CouncilMeetings={councilmeetings} User={users[0]} />
    );

    wrapper.find('.button').at(0).simulate('click');
    t.truthy(saveStub.calledOnce);

});

test('Show past dates shows past dates', t => {
    const wrapper = mount(
        <CouncilmeetingListCreate CouncilMeetings={councilmeetings} User={users[0]} />
    );

    t.is(wrapper.find('tr').length, 3);

    wrapper.find('.checkbox').find('input').simulate('change');

    t.is(wrapper.find('tr').length, 5);
});

test('Changing meetings date', t => {
    const updateStub = sinon.stub();
    const wrapper = mount(
        <CouncilmeetingListCreate updateCouncilMeeting={updateStub} CouncilMeetings={councilmeetings} User={users[0]} />
    );

    //Nothing is chosen
    t.is(wrapper.state().updateCouncilMeeting.values.id, '');
    //Take the first meeting, press the green button.
    wrapper.find('tr').at(1).find('.green').simulate('click');
    //First meeting is chosen.
    t.is(wrapper.state().updateCouncilMeeting.values.id, 1);

    wrapper.find('.green button').simulate('click');

    t.truthy(updateStub.calledOnce);
});

test('Delete meeting', t => {
    const deleteStub = sinon.stub();
    const wrapper = mount(
        <CouncilmeetingListCreate deleteCouncilMeeting={deleteStub} CouncilMeetings={councilmeetings} User={users[0]} />
    );
    
    wrapper.find('tr').at(1).find('.red').simulate('click');

    t.truthy(deleteStub.calledOnce);
});