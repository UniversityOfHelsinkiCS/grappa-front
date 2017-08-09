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

test.todo('Creating new councilmeeting');
/*
test('Creating new councilmeeting', t => {
    const wrapper = mount(
        <CouncilmeetingListCreate CouncilMeetings={councilmeetings} User={users[0]} />
    );

    
});
*/

test.todo('Creating new councilmeeting to the past');

test.todo('Show past dates shows past dates');

test.todo('Changing meetings date');