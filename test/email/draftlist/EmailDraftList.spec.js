import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { emailDrafts } from '../../mockdata';

import { EmailDraftList } from '../../../src/email/draftlist/EmailDraftList';

test('renders properly', t => {
    const wrapper = shallow(
        <EmailDraftList />
    );

    //One button: create new draft 
    t.is(wrapper.find('.button').length, 1);
});

test('renders in mount', t => {
    const wrapper = mount(
        <EmailDraftList draftList={emailDrafts} />
    );

    //Three buttons: two edits and create new draft
    t.is(wrapper.find('.button').length, 3);
    t.is(wrapper.find('EmailDraft').length, 2);
})

test('adding new draft', t => {
    const sendStub = sinon.stub();
    const wrapper = mount(
        <EmailDraftList sendAddDraft={sendStub} draftList={emailDrafts} />
    );

    wrapper.find("input").at(2).simulate('change', {target: { value: "aNewDraft"}});
    wrapper.find(".button").at(2).simulate('click');

    t.truthy(sendStub.calledOnce);
    t.truthy(sendStub.calledWith({
            id: 30,
            body: '',
            title: '',
            type: 'aNewDraft'
        })
    );
})