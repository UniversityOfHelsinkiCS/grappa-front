import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { emailDrafts } from '../../mockdata';

import { EmailDraft } from '../../../src/email/draftlist/EmailDraft';

test('renders properly', t => {
    const wrapper = shallow(
        <EmailDraft draft={emailDrafts[0]} />
    );

    //One button: edit
    t.is(wrapper.find('.button').length, 1);
});

test('edit button', t => {
    const wrapper = shallow(
        <EmailDraft draft={emailDrafts[0]} />
    );

    wrapper.find('.button').simulate('click');
    t.is(wrapper.find('.button').length, 3);
})

test('stop edit button', t => {
    const wrapper = shallow(
        <EmailDraft draft={emailDrafts[0]} />
    );

    wrapper.find('.button').simulate('click');
    t.is(wrapper.find('.button').length, 3);
    wrapper.find('.button').at(1).simulate('click');
    t.is(wrapper.find('.button').length, 1);
});

test('delete button', t => {
    const deleteStub = sinon.stub();
    const wrapper = shallow(
        <EmailDraft sendDeleteRequest={deleteStub} draft={emailDrafts[0]} />
    );

    wrapper.find('.button').simulate('click');
    wrapper.find('.button').at(2).simulate('click');
    //It shouldn't delete when first pressed.
    t.falsy(deleteStub.calledOnce);
    wrapper.find('.button').at(2).simulate('click');
    t.truthy(deleteStub.calledOnce);
});