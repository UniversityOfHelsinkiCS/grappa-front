import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { councilmeetings, users, theses } from "../mockdata";

import { CouncilmeetingShow } from '../../src/councilmeeting/CouncilMeetingShow';

test('renders properly', t => {
    const wrapper = shallow(
        <CouncilmeetingShow councilmeetings={councilmeetings} user={users[0]} params={{id: '1'}}/>
    );

    //Four buttons: Next, Download Selected, Move to Previous Meeting, Move to Next Meeting
    t.is(wrapper.find('button').length, 4);
    //Page should contain the ThesisList
    t.is(wrapper.find('ThesisList').length, 1);
});

test('renders in mount', t => {
    const wrapper = mount(
        <CouncilmeetingShow councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{id: '1'}} />
    );

    //Five buttons: Next, Download Selected, Move to Previous Meeting, Move to Next Meeting
    //Toggle all unselected
    t.is(wrapper.find('button').length, 5);
});

test('Next button', t => {
    const wrapper = mount(
        <CouncilmeetingShow councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{id: '1'}}/>
    );
    t.is(wrapper.state().filteredTheses.length, 0);
    //only one row: column headers
    t.is(wrapper.find('tr').length, 1);
    wrapper.find('button').at(0).simulate('click');
    t.is(wrapper.state().filteredTheses.length, 2);
    t.is(wrapper.find('tr').length, 3);
});

/*
test('Download button', t => {
    const wrapper = shallow(
        <CouncilmeetingShow councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{id: '1'}}/>
    );

//    wrapper.find('.button').at[1].simulate('click');
});

test('Move to Previous Meeting', t => {
    const wrapper = shallow(
        <CouncilmeetingShow councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{id: '1'}}/>
    );
//    wrapper.find('.button').at[2].simulate('click');
});

test('Move to Next Meeting', t => {
    const wrapper = shallow(
        <CouncilmeetingShow councilmeetings={councilmeetings} user={users[0]} theses={theses} params={{id: '1'}}/>
    );
//    wrapper.find('.button').at[3].simulate('click');
});
*/