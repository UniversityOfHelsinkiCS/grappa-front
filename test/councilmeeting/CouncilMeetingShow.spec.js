import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { councilmeetings, users, theses } from "../mockdata";

import { CouncilmeetingShow } from '../../src/councilmeeting/CouncilMeetingShow';

test('renders properly', t => {
    const wrapper = shallow(
        <CouncilmeetingShow councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{ id: '1' }} />
    );

    //One button: Next
    t.is(wrapper.find('button').length, 1);
    //Page should contain the ThesisList
    t.is(wrapper.find('ThesisList').length, 1);
});

test('renders in mount', t => {
    const wrapper = mount(
        <CouncilmeetingShow councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{ id: '1' }} />
    );

    //Five buttons: Next 
    //(from ThesisList: ) Download Selected, Move to Previous Meeting, 
    // Move to Next Meeting, Toggle all unselected
    t.is(wrapper.find('button').length, 5);
});

//TODO: Test next and previous appear correctly

test('Next button', t => {
    const wrapper = mount(
        <CouncilmeetingShow councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{ id: '1' }} />
    );
    t.is(wrapper.state().theses.length, 0);
    //only one row: column headers
    t.is(wrapper.find('tr').length, 1);

    wrapper.find('button').at(0).simulate('click');

    console.log(wrapper.debug());

    t.is(wrapper.find('button').length, 8);

    t.is(wrapper.state().theses.length, 2);
    //Three rows: headers and 2 theses
    t.is(wrapper.find('tr').length, 3);
});


test('Download button no theses', t => {
    const downloadStub = sinon.stub();

    const wrapper = mount(
        <CouncilmeetingShow downloadTheses={downloadStub} councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{ id: '1' }} />
    );

    wrapper.find('.button').at(1).simulate('click');

    t.truthy(downloadStub.calledWith({
        thesisIds: [],
        CouncilMeetingId: 1
    }));

    t.truthy(downloadStub.calledOnce);
});

test('Download button with theses', t => {
    const downloadStub = sinon.stub();

    const wrapper = mount(
        <CouncilmeetingShow downloadTheses={downloadStub} councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{ id: '1' }} />
    );
    //Next
    wrapper.find('.button').at(0).simulate('click');
    //All theses are selected, so press the "Toggle all unselected";
    wrapper.find('.button').at(5).simulate('click');
    //Select the first thesis
    wrapper.find('input').at(6).simulate('change');

    //Try downloading
    wrapper.find('.button').at(2).simulate('click');

    t.truthy(downloadStub.calledWith({
        thesisIds: [2],
        CouncilMeetingId: 2
    }));

    t.truthy(downloadStub.calledOnce);
});

test('Move to Previous Meeting', t => {
    const moveStub = sinon.stub();

    const wrapper = mount(
        <CouncilmeetingShow moveTheses={moveStub} councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{ id: '1' }} />
    );
    //Next
    wrapper.find('.button').at(0).simulate('click');
    //All theses are selected, so press the "Toggle all unselected";
    wrapper.find('.button').at(5).simulate('click');
    //Select the first thesis
    wrapper.find('input').at(6).simulate('change');
    //Move to previous
    wrapper.find('.button').at(3).simulate('click');
    t.truthy(moveStub.calledWith({
        thesisIds: [2],
        CouncilMeetingId: 1
    }));
    t.truthy(moveStub.calledOnce);
});


test('Move to Next Meeting', t => {
    const moveStub = sinon.stub();

    const wrapper = mount(
        <CouncilmeetingShow moveTheses={moveStub} councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{ id: '1' }} />
    );
    //Next
    wrapper.find('.button').at(0).simulate('click');
    //All theses are selected, so press the "Toggle all unselected";
    wrapper.find('.button').at(5).simulate('click');
    //Select the first thesis
    wrapper.find('input').at(6).simulate('change');
    //Move to next
    wrapper.find('.button').at(4).simulate('click');
    t.truthy(moveStub.calledWith({
        thesisIds: [2],
        CouncilMeetingId: 3
    }));
    t.truthy(moveStub.calledOnce);
});
